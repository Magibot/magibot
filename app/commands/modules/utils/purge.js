const Commando = require('discord.js-commando');

class Purge extends Commando.Command {
  constructor(client) {
    super(client, client.wrapper.commands.purge);
  }

  async run(message, { deleteCount }) {
    try {
      const fetched = await message.channel.fetchMessages({ limit: deleteCount });
      await message.channel.bulkDelete(fetched);
    } catch (err) {
      this.client.logger.error(err);
      if (err.name === 'DiscordAPIError') {
        await message.reply(err.message);
        return;
      }

      await message.reply('An error occurred while purging messages, please contact a Magi administrator');
    }
  }
}

module.exports = Purge;
