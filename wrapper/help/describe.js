const options = (prefix) => ({
  usage: `${prefix} describe <command name>`,
  name: 'describe',
  group: 'help',
  memberName: 'describe',
  description: 'Describe the usage of an specific command, showing examples and parameters needed',
  details: 'Should receive one argument referring to the command you want to know about',
  examples: [
    `${prefix} describe purge`,
    `${prefix} describe play`,
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
