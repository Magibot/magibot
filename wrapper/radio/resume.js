const options = (prefix) => ({
  usage: `${prefix} resume`,
  name: 'resume',
  group: 'radio',
  aliases: ['restart', 'come back'],
  memberName: 'resume',
  description: 'Resume the stream paused. The bot will come back playing',
  details: 'Restart the fun',
  examples: [
    `${prefix} resume`,
  ],
  guildOnly: true,
});

module.exports = { options };
