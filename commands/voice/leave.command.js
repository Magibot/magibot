/* eslint-disable class-methods-use-this */
const Commando = require('discord.js-commando');

class LeaveCommand extends Commando.Command {
  constructor(client) {
    const commandProps = {
      name: 'leave',
      group: 'voice',
      memberName: 'leave',
      description: 'Leave the voice channel bot is in.',
    };

    super(client, commandProps);
    this.commandProps = commandProps;
  }

  async run(msg) {
    const { voiceConnection } = msg.guild;
    if (!voiceConnection) {
      return msg.channel.send('Magibot should be connected to a voice channel to leave.');
    }

    const { voiceChannel } = msg.member;
    if (!voiceChannel || voiceChannel.id !== voiceConnection.channel.id) {
      return msg.channel.send(
        'You should be connected to the same voice channel as the bot execute this command.',
      );
    }

    await voiceConnection.disconnect();

    const { id } = msg.guild;
    const guild = global.guilds[id];
    if (guild && guild.music.dispatcher) {
      guild.resetMusicSettings();
      msg.channel.send('Song queue cleared.');
    }

    return msg.channel.send(`Successfully disconnected from ${voiceConnection.channel.name}.`);
  }
}

module.exports = LeaveCommand;
