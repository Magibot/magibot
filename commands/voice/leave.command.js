/* eslint-disable class-methods-use-this */
const Commando = require('discord.js-commando');
const { checkUserVoiceConnection } = require('../../helpers/voice.helper');

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
    const { error } = checkUserVoiceConnection(msg);
    if (error) {
      return msg.channel.send(error);
    }

    const { voiceConnection } = msg.guild;
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
