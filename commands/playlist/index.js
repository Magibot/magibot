const Commando = require('discord.js-commando');

class PlaylistAPI extends Commando.Command {
  constructor(client) {
    super(client, client.wrapper.commands.playlist);
    this.subCommands = {};
  }

  async run(message, args) {
    const {
      ok, reply, subcommand, subargs,
    } = this.client.helpers.command.handleCommandWrapperArguments(args);
    if (!ok) {
      return message.reply(reply);
    }

    switch (subcommand) {
      case 'play':
      case 'start':
        return message.reply('play');
      default:
        // Show possible commands of Star Wars API
        return message.reply('Wrong usage of command! This subcommand does not exist');
    }
  }
}

module.exports = PlaylistAPI;
