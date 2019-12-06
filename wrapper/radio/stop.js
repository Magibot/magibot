const options = (prefix) => ({
  usage: `${prefix} stop`,
  name: 'stop',
  group: 'radio',
  aliases: ['s', 'break'],
  memberName: 'stop',
  description: 'Stop the stream. This command will also clear the queue',
  details: 'Destroy the music if you hate it',
  examples: [
    `${prefix} stop`,
  ],
  guildOnly: true,
});

module.exports = { options };
