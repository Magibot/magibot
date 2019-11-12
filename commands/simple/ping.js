const Commando = require('discord.js-commando');

class Ping extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      aliases: ['pong', 'ms', 'latency'],
      group: 'simple',
      memberName: 'ping',
      description: 'Calculates ping between sending a message and editing it, giving a nice round-trip latency. The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)',
      throttling: {
        usages: 3,
        duration: 10,
      },
    });
  }

  async run(message) {
    const m = await message.channel.send('Ping?');
    return m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(this.client.ping)}ms`);
  }
}

module.exports = Ping;
