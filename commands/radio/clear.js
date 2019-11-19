const Commando = require('discord.js-commando');
const env = require('../../config/env');

class Clear extends Commando.Command {
  static options() {
    return {
      usage: `${env.client.prefix} clear`,
      name: 'clear',
      group: 'radio',
      aliases: ['c', 'clean', 'empty'],
      memberName: 'clear',
      description: 'Clear the stream queue if there\'s one',
      details: 'You can repair some mess you did or destroy everyone\'s fun',
      examples: [
        `${env.client.prefix} clear`,
      ],
      guildOnly: true,
    };
  }

  constructor(client) {
    super(client, Clear.options());
  }

  async run(message) {
    const { voiceChannel } = message.member;
    const { voiceConnection } = message.guild;
    if (voiceChannel && voiceConnection && voiceChannel.id !== voiceConnection.channel.id) {
      return message.reply('To execute this command you should be connected to the same voice channel as the bot');
    }

    const streamer = global.Radio.getStream(message.guild.id);
    if (streamer && streamer.isPlaying && streamer.totalOfElementsInQueue() === 0) {
      return message.channel.send('There is only one stream playing. None in queue');
    }

    if (streamer) {
      streamer.clearQueue();
    }

    return message.channel.send('Queue successfully emptied');
  }
}


module.exports = Clear;
