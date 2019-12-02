const Commando = require('discord.js-commando');
const Character = require('./sub/character');

class StarWarsAPI extends Commando.Command {
  constructor(client) {
    super(client, client.wrapper.commands.swapi);
    this.subCommands = {
      Character,
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
      return message;
    }

    const command = arrayArgs.shift();
    if (command === 'character') {
      if (arrayArgs.length === 0 || arrayArgs[0] === 'all') {
        return this.subCommands.Character.all(message);
      }

      return this.subCommands.Character.search(message, { character: arrayArgs[0] });
    }
    // Show possible commands of Star Wars API
  }
}


module.exports = StarWarsAPI;
