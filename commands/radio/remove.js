const Commando = require('discord.js-commando');
const embed = require('../../utils/embed');

class Remove extends Commando.Command {
  constructor(client) {
    super(client, client.wrapper.commands.remove);
  }

  async run(message, { index }) {
    if (index === 0) {
      return message.reply('It is not possible to remove the song playing. Jump it with the skip command');
    }

    const { voiceChannel } = message.member;
    const { voiceConnection } = message.guild;
    if (voiceChannel && voiceConnection && voiceChannel.id !== voiceConnection.channel.id) {
      return message.reply('To execute this command you should be connected to the same voice channel as the bot');
    }

    const streamer = this.client.Radio.getStream(message.guild.id);
    if (!streamer || (streamer && streamer.isStopped)) {
      return message.reply('The queue is empty and there\'s nothing to remove');
    }

    const removed = streamer.removeFromQueue(index - 1);
    if (!removed) {
      return message.reply('Wrong value for index, no element with this index was found');
    }

    const response = embed.create();
    response
      .setTitle('Stream successfully removed from queue')
      .addField('Title', removed.info.title)
      .addField('Added by', removed.addedBy.username)
      .addField('Streams in queue now', streamer.totalOfElementsInQueue)
      .addField('Queue total time now', streamer.totalLenghSecondsQueueFormatMss);

    return message.channel.send(response);
  }
}


module.exports = Remove;
