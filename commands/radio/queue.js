const Commando = require('discord.js-commando');
const embed = require('../../utils/embed');
const Streamer = require('../../utils/streamer');

class Queue extends Commando.Command {
  constructor(client) {
    super(client, client.wrapper.commands.queue);
  }

  async run(message, { page }) {
    const streamer = this.client.Radio.getStream(message.guild.id);
    if (!streamer || (streamer && streamer.isStopped)) {
      return message.reply('There is nothing playing on Magi\'s radio');
    }

    if (streamer && streamer.totalOfElementsInQueue === 0) {
      return message.reply('Queue is empty. Nothing to play next');
    }

    const queue = streamer.showQueueInformation({ page: (page) || 1 });
    const answer = Queue.createEmbed(embed.create(), message.guild.name, queue);

    return message.channel.send(answer);
  }

  static createEmbed(customEmbed, guildName, queue) {
    const allSongsInfo = queue.elements.map(
      (element, index) => Streamer.getVideoStringInlineInfo(index, element),
    );

    customEmbed
      .setTitle(`Queue for ${guildName}`)
      .setDescription(queue.text)
      .addField('Playing now', queue.aboutPlayingNow)
      .addField('Queue length', queue.totalOfElementsInQueue, true)
      .addField('Queue duration', queue.totalDuration, true)
      .addField('Next on queue', allSongsInfo.join('\n\n'));

    return customEmbed;
  }
}


module.exports = Queue;
