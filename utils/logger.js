"use strict";

const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: 'webapp',
  streams: [
    {
      level: 'debug',
      stream: process.stdout
    },
  ],
  serializers: bunyan.stdSerializers
});

module.exports = logger;
