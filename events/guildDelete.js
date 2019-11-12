const guildService = require('../services/guild.service');
const logger = require('../app/logger');

module.exports = async (guild) => {
  const response = await guildService.destroy(guild.id, {
    typeId: 'discordId',
  });
  if (response.status === 'error') {
    // Create a system of notification through telegram bot, maybe
    logger.error('Received error from API on deleting guild');
    logger.serviceResponseError(response);
    return response.errors;
  }

  logger.success(`Guild ${guild.name}(${guild.id}) successfully deleted`);
  return true;
};
