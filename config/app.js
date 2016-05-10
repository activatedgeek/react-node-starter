'use strict';

const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || '';

// in project root try <environment>.env and fallback on '.env'
let dotenvPath = `${path.dirname(__filename)}/../${process.env.NODE_ENV}.env`;
if (process.env.NODE_ENV !== '') {
  try {
    fs.accessSync(dotenvPath, fs.F_OK);
  } catch (e) {
    dotenvPath = `${path.dirname(__filename)}/../.env`;
  }
}

dotenv.load({
  silent: true,
  path: dotenvPath
});

const config = {
  env: process.env.NODE_ENV || 'production',
  port: process.env.PORT || '3000',
  appKey: process.env.APP_KEY || 'unique-app-key',
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT || 6379, 10)
  }
};

module.exports = config;
