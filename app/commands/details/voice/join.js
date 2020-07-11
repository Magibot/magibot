const options = (prefix) => ({
  usage: `${prefix} join`,
  name: 'join',
  aliases: ['connect', 'enter', 'in', 'come'],
  group: 'voice',
  memberName: 'join',
  description: 'Join the voice channel that the user is connected',
  details: 'Let\'s play some game together',
  examples: [
    `${prefix} join`,
  ],
  guildOnly: true,
});

module.exports = {
  options,
};
