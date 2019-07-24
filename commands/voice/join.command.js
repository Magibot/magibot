/* eslint-disable class-methods-use-this */
const Commando = require('discord.js-commando');

class JoinCommand extends Commando.Command {
  constructor(client) {
    const commandProps = {
      name: 'join',
      group: 'voice',
      member: 'join',
      description: 'Joins the channel the user is connected to.',
    };

    super(client, commandProps);
    this.commandProps = commandProps;
  }

  async run(msg) {
    const { voiceChannel } = msg.member;
    if (!voiceChannel) {
      return msg.channel.send('You should be connected to a voice channel');
    }

    const { voiceConnection } = msg.guild;
    if (voiceConnection) {
      return msg.channel.send(
        `Magibot is already connected to ${msg.guild.voiceConnection.channel.name}`,
      );
    }

    await voiceChannel.join();
    return msg.channel.send(`Successfully connected to \`${voiceChannel.name}\`. :yum:`);
  }
}

module.exports = JoinCommand;
