const options = (prefix) => ({
  usage: `${prefix} leave`,
  name: 'leave',
  aliases: ['disconnect', 'out', 'go'],
  group: 'voice',
  memberName: 'leave',
  description: 'Leave the voice channel if the bot is in one',
  details: 'Come on man, don\'t threat me like that',
  examples: [
    `${prefix} leave`,
  ],
  guildOnly: true,
});

module.exports = {
  options,
};
