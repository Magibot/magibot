const options = (prefix) => ({
  usage: `${prefix} clear`,
  name: 'clear',
  group: 'radio',
  aliases: ['c', 'clean', 'empty'],
  memberName: 'clear',
  description: 'Clear the stream queue if there\'s one',
  details: 'You can repair some mess you did or destroy everyone\'s fun',
  examples: [
    `${prefix} clear`,
  ],
  guildOnly: true,
});

module.exports = { options };
