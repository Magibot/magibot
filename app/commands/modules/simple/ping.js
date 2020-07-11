const Commando = require('discord.js-commando');

class Ping extends Commando.Command {
  constructor(client) {
    super(client, client.wrapper.commands.ping);
  }

  async run(message) {
    const m = await message.channel.send('Ping?');
    return m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(this.client.ping)}ms`);
  }
}

module.exports = Ping;
