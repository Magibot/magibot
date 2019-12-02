const Commando = require('discord.js-commando');

class Leave extends Commando.Command {
  constructor(client) {
    super(client, client.wrapper.commands.leave);
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
      const streamer = this.client.Radio.getStream(message.guild.id);
      if (streamer) {
        streamer.disconnect();
        // TODO: Destroy the streamer after some time without use
        // this.client.Radio.destroy(message.guild.id)
      }

      return message.channel.send(`**Successfully disconnected from** \`${voiceConnection.channel.name}\` :pleading_face:`);
    }

    return message.channel.send('Bot is not connected to any voice channel :upside_down:');
  }
}

module.exports = Leave;
