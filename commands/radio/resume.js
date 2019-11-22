const Commando = require('discord.js-commando');
const env = require('../../config/env');

class Resume extends Commando.Command {
  static options() {
    return {
      usage: `${env.client.prefix} resume`,
      name: 'resume',
      group: 'radio',
      aliases: ['r', 'restart', 'come back'],
      memberName: 'resume',
      description: 'Resume the stream paused. The bot will come back playing',
      details: 'Restart the fun',
      examples: [
        `${env.client.prefix} resume`,
      ],
      guildOnly: true,
    };
  }

  constructor(client) {
    super(client, Resume.options());
  }

  async run(message) {
    const { voiceChannel } = message.member;
    const { voiceConnection } = message.guild;
    if (voiceChannel && voiceConnection && voiceChannel.id !== voiceConnection.channel.id) {
      return message.reply('To execute this command you should be connected to the same voice channel as the bot');
    }

    const streamer = global.Radio.getStream(message.guild.id);
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
