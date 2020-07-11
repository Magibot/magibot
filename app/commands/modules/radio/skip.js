const Commando = require('discord.js-commando');

class Skip extends Commando.Command {
  constructor(client) {
    super(client, client.wrapper.commands.skip);
  }

  async run(message) {
    const { ok, reply } = this.client.helpers.command.checkChannelConnection(message);
    if (!ok) {
      return message.reply(reply);
    }

    const streamer = this.client.Radio.getStream(message.guild.id);
    if (!streamer || (streamer && streamer.isStopped)) {
      return message.reply('There is nothing playing on Magi\'s radio');
    }

    if (streamer && streamer.totalOfElementsInQueue === 0) {
      return message.reply('Skipper :ok: But the queue is empty. Nothing to play next');
    }

    const playingNow = await streamer.skip();
    return message.channel.send(`Playing now ${playingNow.info.title}`);
  }
}


module.exports = Skip;
