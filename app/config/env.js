const logger = require('../utils/logger');
require('dotenv').config();

const required = [
  'DISCORD_TOKEN',
  'DISCORD_OWNER_ID',
  'API_BASE_URL',
  'API_CLIENT_ID',
  'CLIENT_COMMAND_PREFIX',
  'GOOGLE_API_KEY',
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
  logger.error('Please set them to start ELIS');
  process.exit(1);
}

module.exports = {
  discord: {
    token: process.env.DISCORD_TOKEN,
    ownerId: process.env.DISCORD_OWNER_ID,
    prefix: process.env.CLIENT_COMMAND_PREFIX,
    message: {
      cacheLifetime: parseInt(process.env.CLIENT_MESSAGE_CACHE_LIFETIME, 10) || 1800,
      sweepInterval: parseInt(process.env.CLIENT_MESSAGE_SWEEP_INTERVAL, 10) || 3600,
      cacheMaxSize: parseInt(process.env.CLIENT_MESSAGE_CACHE_MAX_SIZE, 10) || 125,
    },
    retryLimit: parseInt(process.env.CLIENT_RETRY_LIMIT, 10) || 5,
    picture: process.env.CLIENT_PICTURE_LINK,
    website: process.env.CLIENT_WEBSITE,
  },
  backend: {
    api: {
      clientId: process.env.API_CLIENT_ID,
      baseUrl: process.env.API_BASE_URL,
    },
  },
  youtube: {
    apiKey: process.env.GOOGLE_API_KEY,
  },
};
