const options = (prefix) => ({
  usage: `${prefix} commands`,
  name: 'commands',
  group: 'help',
  memberName: 'commands',
  description: 'Shows a list of all commands that the bot can do',
  details: 'Only for noobs',
  examples: [
    `${prefix} commands`,
  ],
});

module.exports = { options };
