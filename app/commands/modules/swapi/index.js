const Commando = require('discord.js-commando');
const Character = require('./sub/character');
const List = require('./sub/list');

class StarWarsAPI extends Commando.Command {
  constructor(client) {
    super(client, client.wrapper.commands.swapi);
    this.subCommands = {
      Character,
      List,
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
      case 'character':
        return this.subCommands.Character.handle(this.client, message, subargs);
      case 'list':
        return this.subCommands.List.handle(this.client, message, subargs);
      default:
        // Show possible commands of Star Wars API
        return message.reply('Wrong usage of command');
    }
  }
}


module.exports = StarWarsAPI;
