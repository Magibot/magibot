const options = (prefix) => ({
  usage: `${prefix} ping`,
  name: 'ping',
  aliases: ['pong', 'ms', 'latency'],
  group: 'simple',
  memberName: 'ping',
  description: 'Calculates ping between sending a message and editing it, giving a nice round-trip latency. The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)',
  details: 'Ping? Pong',
  throttling: {
    usages: 3,
    duration: 10,
  },
  examples: [
    `${prefix} ping`,
  ],
});

module.exports = { options };
