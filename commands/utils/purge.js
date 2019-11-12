const Commando = require('discord.js-commando');
const logger = require('../../app/logger');
const env = require('../../config/env');

class Purge extends Commando.Command {
  constructor(client) {
    const commandName = 'purge';
    super(client, {
      defaultHandling: false,
      name: commandName,
      group: 'utils',
      memberName: commandName,
      description: 'This command removes all messages from all users in the channel, minimum of 2, up to 100 messages',
      details: 'Should receive one argument referring to the amount of messages you want to purge from channel',
      examples: [
        `${env.clientCommandPrefix} ${commandName} 50 (this will purge the last 50 messages from the channel)`,
      ],
      throttling: {
        usages: 2,
        duration: 3600,
      },
      guildOnly: true,
      clientPermissions: ['ADMINISTRATOR'],
      userPermissions: ['MANAGE_MESSAGES'],
      argsCount: 1,
      args: [
        {
          key: 'deleteCount',
          prompt: '',
          type: 'integer',
          validate: (deleteCount) => deleteCount && deleteCount > 1 && deleteCount < 101,
          label: 'amount of messages',
        },
      ],
    });
  }

  async run(message, { deleteCount }) {
    try {
      const fetched = await message.channel.fetchMessages({ limit: deleteCount });
      await message.channel.bulkDelete(fetched);
    } catch (err) {
      logger.error(err);
      if (err.name === 'DiscordAPIError') {
        await message.reply(err.message);
        return;
      }

      await message.reply('An error occurred while purging messages, please contact a Magi administrator');
    }
  }
}

module.exports = Purge;
