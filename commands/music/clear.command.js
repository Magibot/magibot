/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
const Commando = require('discord.js-commando');

class ClearCommand extends Commando.Command {
  constructor(client) {
    const commandProps = {
      name: 'clear',
      group: 'music',
      memberName: 'clear',
      description: 'Clears the music queue, leaving only the song that is playing',
    };

    super(client, commandProps);
    this.commandProps = commandProps;
  }

  async run(msg) {
    const isBotConnectedToVoiceChannel = msg.guild.voiceConnection !== null;
    if (!isBotConnectedToVoiceChannel) {
      return msg.channel.send('Magibot is not playing any song.');
    }

    const botVoiceChannel = msg.guild.voiceConnection.channel;
    const userVoiceChannel = msg.member.voiceChannel;
    const isUserConnectedToSameVoiceChannel = userVoiceChannel && userVoiceChannel.id === botVoiceChannel.id;

    if (!isUserConnectedToSameVoiceChannel) {
      return msg.channel.send(
        'You should be connected to the same channel as the bot to execute this command',
      );
    }

    const response = ClearCommand.clear(msg.guild.id);
    return msg.channel.send(response);
  }

  static clear(guildId) {
    const guild = global.guilds[guildId];
    if (guild.music.queue.length === 0 && guild.music.songPlaying) {
      return 'Only one song is playing. Queue is empty';
    }

    if (guild.music.queue.length === 0) {
      return 'Queue is already empty.';
    }

    guild.music.queue.clear();
    return 'Queue was **successfully** cleared.';
  }
}

module.exports = ClearCommand;
