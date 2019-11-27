const Commando = require('discord.js-commando');
const env = require('../../config/env');
const embed = require('../../utils/embed');

class Remove extends Commando.Command {
  static options() {
    return {
      usage: `${env.discord.prefix} remove`,
      name: 'remove',
      group: 'radio',
      aliases: ['r'],
      memberName: 'remove',
      description: 'Remove a stream from queue by it\'s index',
      details: 'Undo mess',
      examples: [
        `${env.discord.prefix} remove <index>'`,
        `${env.discord.prefix} remove 3`,
      ],
      guildOnly: true,
      args: [
        {
          key: 'index',
          prompt: 'Index of the element in queue to be removed',
          type: 'integer',
          validate: () => true,
          label: 'index in queue',
        },
      ],
    };
  }

  constructor(client) {
    super(client, Remove.options());
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
