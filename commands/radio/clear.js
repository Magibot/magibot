const Commando = require('discord.js-commando');

class Clear extends Commando.Command {
  constructor(client) {
    super(client, client.wrapper.commands.clear);
  }

  async run(message) {
    const { voiceChannel } = message.member;
    const { voiceConnection } = message.guild;
    if (voiceChannel && voiceConnection && voiceChannel.id !== voiceConnection.channel.id) {
      return message.reply('To execute this command you should be connected to the same voice channel as the bot');
    }

    const streamer = this.client.Radio.getStream(message.guild.id);
    if (streamer && streamer.isPlaying && streamer.totalOfElementsInQueue === 0) {
      return message.channel.send('There is only one stream playing. None in queue');
    }

    if (streamer) {
      streamer.clearQueue();
    }

    return message.channel.send('Queue successfully emptied');
  }
}


module.exports = Clear;
