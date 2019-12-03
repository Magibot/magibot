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
    if (!args) {
      // Show possible commands of Star Wars API
      return;
    }

    const arrayArgs = args.trim().split(/ +/g);
    if (arrayArgs.length === 0) {
      // Show possible commands of Star Wars API
      return message.reply('Wrong usage of command');
    }

    const subcommand = arrayArgs.shift();
    switch (subcommand) {
      case 'character':
        return this.subCommands.Character.handle(this.client, message, arrayArgs);
      case 'list':
        return this.subCommands.List.handle(this.client, message, arrayArgs);
      default:
        // Show possible commands of Star Wars API
        return message.reply('Wrong usage of command');
    }
  }
}


module.exports = StarWarsAPI;
