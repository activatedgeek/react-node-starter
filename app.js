'use strict';

const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');
const path = require('path');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bunyanMiddleware = require('bunyan-middleware');

const logger = require('./utils/logger');
const log = logger.child({type: `module:${path.basename(__filename)}`});

const config = require('./config/app');

/**
 * routes
 */
const MainRoutes = require('./routes/main');

if (config.env !== 'testing') {
  dotenv.load({silent: true});
}

const app = express();

app.set('port', config.port);

app.set('views', './views');
app.set('view engine', 'jade');
app.set('case sensitive routing', true);

app.use(compression({ threshold: 0 }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// logging all requests via bunyan
if (config.env !== 'testing') {
  app.use(bunyanMiddleware({
    logger: logger.child({
      type: 'access_log'
    })
  }));
}

/**
 * Setup session
 */
let sessionConf = {
  secret: config.appKey,
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: (60 * 60 * 1000)
  }
};

if (config.env !== 'testing') {
  const RedisStore = connectRedis(session);
  sessionConf.store = new RedisStore({
    host: config.redis.host,
    port: config.redis.port,
    client: redis.createClient({host: config.redis.host, port: config.redis.port})
  });
}

app.use(session(sessionConf));
app.use(cookieParser(config.appKey));

app.use('/assets', express.static(path.join(__dirname, 'public/dist')));
if (config.env === 'development') {
  app.use('/vendor', express.static(path.join(__dirname, 'bower_components')));
}

app.use('/', MainRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({
    error: `"${req.originalUrl}" not found`
  });
});

// error handler
app.use((err, req, res, next) => {
  log.error(err);

  res.status(err.status || 500).json({
    error: (config.env === 'development') ? err.message : 'internal error'
  });
});

module.exports = app;
