const options = (prefix) => ({
  usage: `${prefix} remove`,
  name: 'remove',
  group: 'radio',
  aliases: ['r'],
  memberName: 'remove',
  description: 'Remove a stream from queue by it\'s index',
  details: 'Undo mess',
  examples: [
    `${prefix} remove <index>'`,
    `${prefix} remove 3`,
  ],
  guildOnly: true,
  args: [
    {
      key: 'index',
      prompt: 'Index of the element in queue to be removed',
      type: 'integer',
      validate: () => true,
      label: 'index in queue',
    },
  ],
});

module.exports = { options };
