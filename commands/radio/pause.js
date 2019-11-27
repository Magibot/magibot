const Commando = require('discord.js-commando');
const env = require('../../config/env');

class Pause extends Commando.Command {
  static options() {
    return {
      usage: `${env.client.prefix} pause`,
      name: 'pause',
      group: 'radio',
      memberName: 'pause',
      description: 'Pause the stream playing. It can be resumed back with the command resume',
      details: 'Crash the people\'s fun',
      examples: [
        `${env.client.prefix} pause`,
      ],
      guildOnly: true,
    };
  }

  constructor(client) {
    super(client, Pause.options());
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
