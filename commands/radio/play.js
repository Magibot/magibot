const Commando = require('discord.js-commando');

class Play extends Commando.Command {
  constructor(client) {
    super(client, client.wrapper.commands.play);
  }

  async run(message, args) {
    const { ok, reply } = this.client.helpers.command.checkChannelConnection(message);
    if (!ok) {
      return message.reply(reply);
    }

    try {
      if (!message.guild.voiceConnection) {
        // Bot is not connected to a voice channel

        await message.member.voiceChannel.join();
        message.channel.send(`**Connected to** \`${message.member.voiceChannel.name}\` successfully. :yum:`);
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

      const { stream, errorMessage } = await streamer.play(args, addedBy);
      if (errorMessage) {
        return message.reply(errorMessage);
      }

      let answer;
      if (stream.status === 'queued') {
        answer = this.client.customEmbed.create();
        answer
          .setTitle(`${stream.info.title}`)
          .setURL(stream.url)
          .setAuthor('Added to queue', message.member.user.avatarURL)
          .addField('Channel', stream.info.author.name)
          .addField('Duration', stream.duration, true)
          .addField('Position in queue', stream.positionOnQueue, true);
      }

      answer = (answer) || `**Playing** \`${stream.info.title}\` now`;
      return message.channel.send(answer);
    } catch (err) {
      this.client.logger.error(err);
    }
  }
}

module.exports = Play;
