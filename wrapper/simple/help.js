const options = (prefix) => ({
  usage: `${prefix} help <command name>`,
  name: 'help',
  group: 'simple',
  memberName: 'help',
  description: 'Show how you can use an especific bot command',
  details: 'Should receive one argument referring to the command you want to know about',
  examples: [
    `${prefix} help purge`,
    `${prefix} help play`,
  ],
  args: [
    {
      key: 'commandName',
      prompt: 'Name of the command you want to know about',
      type: 'string',
      label: 'command name',
    },
  ],
});

module.exports = { options };
