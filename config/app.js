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
