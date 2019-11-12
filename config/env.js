const logger = require('../utils/logger');
require('dotenv').config();

const required = [
  'DISCORD_TOKEN',
  'DISCORD_OWNER_ID',
  'API_BASE_URL',
  'API_CLIENT_ID',
  'CLIENT_COMMAND_PREFIX',
];

const missingVariables = [];
for (let i = 0; i < required.length; i += 1) {
  const envVariable = required[i];
  if (!process.env[envVariable]) {
    missingVariables.push(envVariable);
  }
}

if (missingVariables.length > 0) {
  logger.error(`Missing the following environment variables: ${missingVariables}`);
  logger.error('Please set them to start Magi');
  process.exit(1);
}

module.exports = {
  client: {
    token: process.env.DISCORD_TOKEN,
    ownerId: process.env.DISCORD_OWNER_ID,
    prefix: process.env.CLIENT_COMMAND_PREFIX,
    messageCacheLifetime: parseInt(process.env.CLIENT_MESSAGE_CACHE_LIFETIME, 10) || 1800,
    messageSweepInterval: parseInt(process.env.CLIENT_MESSAGE_SWEEP_INTERVAL, 10) || 3600,
    messageCacheMaxSize: parseInt(process.env.CLIENT_MESSAGE_CACHE_MAX_SIZE, 10) || 125,
    retryLimit: parseInt(process.env.CLIENT_RETRY_LIMIT, 10) || 5,
  },
  backend: {
    api: {
      clientId: process.env.API_CLIENT_ID,
      baseUrl: process.env.API_BASE_URL,
    },
  },
};
