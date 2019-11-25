process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const env = process.env.NODE_ENV;

let baseConfig = {
  env: process.env.NODE_ENV,
  secrets: {
    jwt: 'ngmgag'
  },
  // 10 days in minutes
  expireTime: 24 * 60 * 10,
}

let envConfig = {};

switch (env) {
  case 'dev':
  case 'development':
    envConfig = require('./dev');
    break;
  case 'prod':
  case 'production':
    envConfig = require('./prod');
    break;
  default:
    envConfig = require('./dev');
}

module.exports = Object.freeze({
  ...envConfig,
  ...baseConfig
})