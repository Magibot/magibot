const guildService = require('../services/guild.service');
const logger = require('../app/logger');

module.exports = async guild => {
  const id = global.GuildIdMap.get(guild.id);
  const response = await guildService.destroy(id);
  if (response.status === 'error') {
    // Create a system of notification through telegram bot, maybe
    logger.error('Received error from API on deleting guild');
    logger.serviceResponseError(response);
    return response.errors;
  }

  global.GuildIdMap.delete(guild.id);
  logger.success(`Guild ${guild.name}(${guild.id}) successfully deleted`);
  return;
};
