const Commando = require('discord.js-commando');
const env = require('../../config/env');

class Join extends Commando.Command {
  static options() {
    return {
      usage: `${env.discord.prefix} join`,
      name: 'join',
      aliases: ['connect', 'enter', 'in', 'come'],
      group: 'voice',
      memberName: 'join',
      description: 'Join the voice channel that the user is connected',
      details: 'Let\'s play some game together',
      examples: [
        `${env.discord.prefix} join`,
      ],
      guildOnly: true,
    };
  }

  constructor(client) {
    super(client, Join.options());
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
