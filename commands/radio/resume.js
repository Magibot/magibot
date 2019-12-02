const Commando = require('discord.js-commando');

class Resume extends Commando.Command {
  constructor(client) {
    super(client, client.wrapper.commands.resume);
  }

  async run(message) {
    const { voiceChannel } = message.member;
    const { voiceConnection } = message.guild;
    if (voiceChannel && voiceConnection && voiceChannel.id !== voiceConnection.channel.id) {
      return message.reply('To execute this command you should be connected to the same voice channel as the bot');
    }

    const streamer = this.client.Radio.getStream(message.guild.id);
    if (!streamer || (streamer && streamer.isStopped)) {
      return message.reply('Radio is already stopped. There is nothing playing on Magi\'s radio');
    }

    if (streamer && streamer.isPlaying) {
      return message.reply('Radio is already playing');
    }

    streamer.resume();

    return message.channel.send('Radio was successfully resumed. Now you can have some fun :yum: again');
  }
}


module.exports = Resume;
