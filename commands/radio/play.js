const Commando = require('discord.js-commando');

class Play extends Commando.Command {
  constructor(client) {
    super(client, client.wrapper.commands.play);
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
      const streamer = this.client.Radio.createStream(
        guild.id,
        channel.id,
        guild.voiceConnection,
      );

      const addedBy = {
        id: message.author.id,
        username: message.author.username,
      };

      const video = await streamer.play(url, addedBy);
      let answer;
      if (video.status === 'queued') {
        answer = this.client.customEmbed.create();
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
