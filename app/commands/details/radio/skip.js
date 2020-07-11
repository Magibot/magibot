const options = (prefix) => ({
  usage: `${prefix} skip`,
  name: 'skip',
  group: 'radio',
  aliases: ['jump', 'j'],
  memberName: 'skip',
  description: 'Skip the current stream playing on voice channel if there is one',
  details: 'Come on, stop doing that',
  examples: [
    `${prefix} skip`,
  ],
  guildOnly: true,
});

module.exports = { options };
