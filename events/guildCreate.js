const guildService = require('../services/guild.service');
const logger = require('../app/logger');

module.exports = async guild => {
  const requestBody = {
    name: guild.name,
    discordId: guild.id,
    region: guild.region,
    discordOwnerId: guild.ownerID,
    iconHash: guild.icon
  };

  const response = await guildService.create(requestBody);
  if (response.status === 'error') {
    // Create a system of notification through telegram bot, maybe
    logger.error('Received error from API on creating guild');
    logger.serviceResponseError(response);
    return response.errors;
  }

  logger.success(`Guild ${guild.name}(${guild.id}) successfully registered`);
  return response.payload;
};
