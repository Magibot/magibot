const Commando = require('discord.js-commando');
const env = require('../../config/env');
const embed = require('../../utils/embed');

const Streamer = require('../../utils/streamer');

class Queue extends Commando.Command {
  static options() {
    return {
      usage: `${env.client.prefix} queue`,
      name: 'queue',
      group: 'radio',
      aliases: ['q'],
      memberName: 'queue',
      description: 'Show the next 10 streams to be played (queue) on the channel. If you pass the page number, you can see the rest of the queue properly',
      details: 'Information is appreciated',
      examples: [
        `${env.client.prefix} queue <?page> (optional)`,
      ],
      guildOnly: true,
      args: [
        {
          key: 'page',
          prompt: 'Pagination of the queue, it represents the page to be shown',
          type: 'integer',
          validate: () => true,
          label: 'page of queue',
        },
      ],
    };
  }

  constructor(client) {
    super(client, Queue.options());
  }

  async run(message, { page }) {
    const streamer = global.Radio.getStream(message.guild.id);
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
