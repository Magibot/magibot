const Commando = require('discord.js-commando');
const env = require('../../config/env');

class Leave extends Commando.Command {
  static options() {
    return {
      usage: `${env.client.prefix} leave`,
      name: 'leave',
      aliases: ['disconnect', 'out', 'go'],
      group: 'voice',
      memberName: 'leave',
      description: 'Leave the voice channel if the bot is in one',
      details: 'Come on man, don\'t threat me like that',
      examples: [
        `${env.client.prefix} leave`,
      ],
      guildOnly: true,
    };
  }

  constructor(client) {
    super(client, Leave.options());
  }

  async run(message) {
    const { voiceChannel } = message.member;

    if (!voiceChannel) {
      return message.reply('To execute this command you should connect to a voice channel');
    }

    const { voiceConnection } = message.guild;

    if (voiceConnection
      && voiceChannel.id !== voiceConnection.channel.id) {
      return message.reply('To execute this command you should be connected to the same voice channel as the bot');
    }

    if (voiceConnection) {
      voiceConnection.disconnect();
      const streamer = global.Radio.getStream(message.guild.id);
      if (streamer) {
        streamer.disconnect();
        // Destroy the streamer after some time without use
        // global.Radio.destroy(message.guild.id)
      }

      return message.channel.send(`**Successfully disconnected from** \`${voiceConnection.channel.name}\` :pleading_face:`);
    }

    return message.channel.send('Bot is not connected to any voice channel :upside_down:');
  }
}

module.exports = Leave;
