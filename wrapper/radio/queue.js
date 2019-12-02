const options = (prefix) => ({
  usage: `${prefix} queue`,
  name: 'queue',
  group: 'radio',
  aliases: ['q'],
  memberName: 'queue',
  description: 'Show the next 10 streams to be played (queue) on the channel. If you pass the page number, you can see the rest of the queue properly',
  details: 'Information is appreciated',
  examples: [
    `${prefix} queue <?page> (optional)`,
  ],
  guildOnly: true,
  args: [
    {
      key: 'page',
      prompt: 'Pagination of the queue, it represents the page to be shown',
      type: 'integer',
      validate: () => true,
      label: 'page of queue',
    },
  ],
});

module.exports = { options };
