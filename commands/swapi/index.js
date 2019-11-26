const Commando = require('discord.js-commando');
const Character = require('./sub/character');

class StarWarsAPI extends Commando.Command {
  static options() {
    return {
      name: 'swapi',
      group: 'swapi',
      memberName: 'swapi',
      description: '',
      isWrapper: true,
      subCommands: {
        character: Character.options(),
      },
    };
  }

  constructor(client) {
    super(client, StarWarsAPI.options());
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
      if (arrayArgs.length === 0) {
        // Search all characters
        return;
      }

      const charName = arrayArgs[0];
      return this.subCommands.Character.search(message, { character: charName });
    }
    // Show possible commands of Star Wars API
  }
}


module.exports = StarWarsAPI;
