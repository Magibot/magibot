const config = require('../config');

const { guildMemberEmbedMessage } = require('../helpers/message.helper');

exports.handleGuildMemberAdd = async (member) => {
  const memberRole = member.guild.roles.find('name', config.server.newMemberRole);
  await member.addRole(memberRole);

  const newMemberLog = guildMemberEmbedMessage(
    member,
    'New member',
    config.messages.colors.memberAdd,
  );
  member.guild.channels.find('name', config.server.mainChannel).send(newMemberLog);
};

/**
 * Create bot channel
 * Create new member role
 * Send welcoming message in the bot channel
 */
exports.handleGuildCreate = guild => guild;

module.exports = (bot) => {
  //   bot.on('guildCreate', EventHandler.onGuildCreate);
  //   bot.on('guildDelete', EventHandler.onGuildDelete);
  //   bot.on('guildMemberRemove', EventHandler.onGuildMemberRemove);

  bot.on('guildMemberAdd', this.handleGuildMemberAdd);
};
