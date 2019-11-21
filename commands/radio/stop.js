const Commando = require('discord.js-commando');
const env = require('../../config/env');

class Stop extends Commando.Command {
  static options() {
    return {
      usage: `${env.client.prefix} stop`,
      name: 'stop',
      group: 'radio',
      aliases: ['s', 'break'],
      memberName: 'stop',
      description: 'Stop the stream. This command will also clear the queue',
      details: 'Destroy the music if you hate it',
      examples: [
        `${env.client.prefix} stop`,
      ],
      guildOnly: true,
    };
  }

  constructor(client) {
    super(client, Stop.options());
  }

  async run(message) {
    const { voiceChannel } = message.member;
    const { voiceConnection } = message.guild;
    if (voiceChannel && voiceConnection && voiceChannel.id !== voiceConnection.channel.id) {
      return message.reply('To execute this command you should be connected to the same voice channel as the bot');
    }

    const streamer = global.Radio.getStream(message.guild.id);
    if (!streamer || (streamer && (streamer.isPlaying || streamer.isPaused))) {
      return message.reply('There is nothing playing on Magi\'s radio');
    }

    if (streamer && streamer.isStopped) {
      return message.reply('Radio is already stopped');
    }

    if (streamer) {
      streamer.stop();
    }

    return message.channel.send('Radio was successfully stopped and queue was cleared');
  }
}


module.exports = Stop;
