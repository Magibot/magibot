const Commando = require('discord.js-commando');

class Pause extends Commando.Command {
  constructor(client) {
    super(client, client.wrapper.commands.pause);
  }

  async run(message) {
    const { voiceChannel } = message.member;
    const { voiceConnection } = message.guild;
    if (voiceChannel && voiceConnection && voiceChannel.id !== voiceConnection.channel.id) {
      return message.reply('To execute this command you should be connected to the same voice channel as the bot');
    }

    const streamer = this.client.Radio.getStream(message.guild.id);
    if (!streamer || (streamer && streamer.isStopped)) {
      return message.reply('There is nothing playing on Magi\'s radio');
    }

    if (streamer && streamer.isPaused) {
      return message.reply('Radio is already paused');
    }

    if (streamer) {
      streamer.pause();
    }

    return message.channel.send('Radio was successfully paused');
  }
}


module.exports = Pause;
