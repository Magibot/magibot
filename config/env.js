const logger = require('../app/logger');
require('dotenv').config();

let token;
if (process.env.NODE_ENV === 'production') {
  token = process.env.DISCORD_TOKEN;
} else {
  token = process.env.DISCORD_DEV_TOKEN;
}

if (!token) {
  logger.error(
    'No Discord token provided. Bot application need a token to handle Discord connection',
  );
  process.exit(1);
}

const apiClientId = process.env.API_CLIENT_ID;
if (!apiClientId) {
  logger.error('No API Client ID registered in environment.');
  process.exit(1);
}

const apiBaseUrl = process.env.API_BASE_URL;
if (!apiBaseUrl) {
  logger.error('No API base URL provided');
  process.exit(1);
}

const clientCommandPrefix = process.env.CLIENT_COMMAND_PREFIX;
if (!clientCommandPrefix) {
  logger.error('No command prefix defined');
}

module.exports = {
  token,
  apiClientId,
  apiBaseUrl,
  clientCommandPrefix,
};
