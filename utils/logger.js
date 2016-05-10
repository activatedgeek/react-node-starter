"use strict";

const bunyan = require('bunyan');
const config = require('../config/app');

const logger = bunyan.createLogger({
  name: 'react-node-starter',
  streams: [
    {
      level: config.env === 'production' ? 'info' : 'debug',
      stream: process.stdout
    },
  ],
  serializers: bunyan.stdSerializers
});

module.exports = logger;
