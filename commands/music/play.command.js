const Discord = require('discord.js');
const Commando = require('discord.js-commando');

const config = require('../../config');
const Guild = require('../../structures/guild');
const Song = require('../../structures/song');
const { getVideoBasicInfo, playVideo } = require('../../helpers/music.helper');
const { fmtMSS } = require('../../helpers/date.helper');

class PlayCommand extends Commando.Command {
  constructor(client) {
    const commandProps = {
      name: 'play',
      group: 'music',
      memberName: 'play',
      description: 'Plays the audio from a video in the Youtube in your voice channel',
    };

    super(client, commandProps);
    this.commandProps = commandProps;
    this.example = `${config.app.prefix}${commandProps.name} <youtube-video-link>`;
  }

  async run(msg, args) {
    const { error } = this.validateUserCommand(msg, args);
    if (error) {
      msg.channel.send(error);
    }

    const { voiceChannel } = msg.member;

    // If bot is not connected already
    if (!msg.guild.voiceConnection) {
      await voiceChannel.join();
      msg.channel.send(`**Connected to** \`${voiceChannel.name}\` successfully. :yum:`);
    }

    const { id } = msg.guild;

    if (!global.guilds[id]) {
      global.guilds[id] = new Guild(id);
    }

    const guild = global.guilds[id];

    const songInfo = await getVideoBasicInfo(args);
    const song = new Song(args, msg.author.id, songInfo);
    guild.music.queue.add(song);

    playVideo(msg.guild.voiceConnection, msg);

    if (guild.music.queue.length > 1) {
      const response = new Discord.RichEmbed()
        .setTitle(`${song.info.title}`)
        .setURL(song.url)
        .setAuthor('Added to queue', msg.member.user.avatarURL)
        .setColor(config.messages.colors.main)
        .addField('Channel', song.info.author.name)
        .addField('Song Duration', fmtMSS(song.info.length))
        .addField('Position', global.servers[msg.guild.id].queue.length - 1);

      return msg.channel.send(response);
    }

    return msg.channel.send(`**Playing now** \`${song.info.title}\``);
  }

  validateUserCommand(msg, args) {
    const response = new Discord.RichEmbed()
      .setTitle('Play audio video')
      .setColor(config.messages.colors.main);

    if (!args) {
      response.addField('Error', 'Put a YouTube video url as argument for the command');
      response.addField('Example', this.example);
      return { error: response };
    }

    const { voiceChannel } = msg.member;
    if (!voiceChannel) {
      return { error: 'You need to be connected in a voice channel to execute this command' };
    }

    // If bot is connected to a voice channel,
    // but the user is trying to play music from another channel
    const userConnectedToADifferentChannel = msg.guild.voiceConnection
      && voiceChannel.position !== msg.guild.voiceConnection.channel.position;

    if (userConnectedToADifferentChannel) {
      return { error: 'You need to be connected to the same voice channel as the bot' };
    }

    return { ok: true };
  }
}

module.exports = PlayCommand;
