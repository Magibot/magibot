const Commando = require('discord.js-commando');
const env = require('../../config/env');
const embed = require('../../utils/embed');

class Play extends Commando.Command {
  static options() {
    return {
      usage: `${env.client.prefix} play <url of the stream to play>`,
      name: 'play',
      group: 'radio',
      aliases: ['p', 'start', 'song', 'video', 'stream'],
      memberName: 'play',
      description: 'Play the sound of a video stream to all users in voice channel. If something is already playing, the video will be added to a queue',
      details: 'Everyone should enjoy some music',
      examples: [
        `${env.client.prefix} play http://youtube.com/link-to-your-favorite-song`,
      ],
      guildOnly: true,
      args: [
        {
          key: 'url',
          prompt: 'Link (url) of a stream to play the sound of the video',
          type: 'string',
          // Validate with a URL Regex
          validate: (url) => {
            const expression = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
            const regex = new RegExp(expression);
            return url.match(regex);
          },
          label: 'url of the stream to play',
        },
      ],
    };
  }

  constructor(client) {
    super(client, Play.options());
  }

  async run(message, { url }) {
    const { voiceChannel } = message.member;

    if (!voiceChannel) {
      return message.reply('To execute this command you should connect to a voice channel');
    }

    const { voiceConnection } = message.guild;

    if (voiceConnection
      && voiceChannel.id !== voiceConnection.channel.id) {
      return message.reply('To execute this command you should be connected to the same voice channel as the bot');
    }

    try {
      if (!message.guild.voiceConnection) {
        // Bot is not connected to a voice channel

        await voiceChannel.join();
        message.channel.send(`**Connected to** \`${voiceChannel.name}\` successfully. :yum:`);
      }

      const { guild, channel } = message;
      const streamer = global.Radio.createStream(
        guild.id,
        channel.id,
        guild.voiceConnection,
      );

      const video = await streamer.play(url, message.author.id);
      let answer;
      if (video.status === 'queued') {
        answer = embed.create();
        answer
          .setTitle(`${video.info.title}`)
          .setURL(video.url)
          .setAuthor('Added to queue', message.member.user.avatarURL)
          .addField('Channel', video.info.author.name)
          .addField('Duration', video.duration, true)
          .addField('Position in queue', video.positionOnQueue, true);
      }

      answer = (answer) || `**Playing** \`${video.info.title}\` now`;
      return message.channel.send(answer);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Play;
