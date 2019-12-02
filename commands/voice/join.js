const Commando = require('discord.js-commando');

class Join extends Commando.Command {
  constructor(client) {
    super(client, client.wrapper.commands.join);
  }

  async run(message) {
    const { voiceChannel } = message.member;

    if (!voiceChannel) {
      return message.reply('To execute this command you should connect to a voice channel');
    }

    const { voiceConnection } = message.guild;

    if (voiceConnection) {
      return message.reply(`Bot is already connected to \`${voiceConnection.channel.name}\`. People are probably using his superpowers`);
    }

    await voiceChannel.join();
    return message.channel.send(`**Connected to** \`${voiceChannel.name}\` successfully. :yum:`);
  }
}

module.exports = Join;
