/* eslint-disable class-methods-use-this */
const Commando = require('discord.js-commando');
const { checkUserVoiceConnection } = require('../../helpers/voice.helper');

class PauseCommand extends Commando.Command {
  constructor(client) {
    const commandProps = {
      name: 'pause',
      group: 'music',
      memberName: 'pause',
      description: 'Pauses the song playing.',
    };

    super(client, commandProps);
    this.commandProps = commandProps;
  }

  async run(msg) {
    const { error } = checkUserVoiceConnection(msg);
    if (error) {
      return msg.channel.send(error);
    }

    const { id } = msg.guild;
    const guild = global.guilds[id];
    if (!guild || !guild.music.songPlaying) {
      return msg.channel.send('No song is playing');
    }

    if (guild.music.dispatcher.paused) {
      return msg.channel.send('Queue is already paused.');
    }

    guild.music.dispatcher.pause();
    return msg.channel.send('Song paused successfully.');
  }
}

module.exports = PauseCommand;
