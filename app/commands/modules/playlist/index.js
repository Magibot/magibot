const Commando = require('discord.js-commando');

const Create = require('./sub/create');

class PlaylistAPI extends Commando.Command {
  constructor(client) {
    super(client, client.wrapper.commands.playlist);
    this.subCommands = {
      Create,
    };
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
      case 'create':
        return this.subCommands.Create.handle(this.client, message, subargs);
      default:
        // Show possible commands of Playlist API
        return message.reply('Wrong usage of command! This subcommand does not exist');
    }
  }
}

module.exports = PlaylistAPI;
