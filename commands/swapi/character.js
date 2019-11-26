const Commando = require('discord.js-commando');
const superagent = require('superagent');
const env = require('../../config/env');

class Character extends Commando.Command {
  static options() {
    return {
      usage: `${env.client.prefix} sw-char <name-of-character-from-star-wars>`,
      name: 'sw-char',
      group: 'swapi',
      memberName: 'sw-char',
      description: 'Returns information about a character from Star Wars movies',
      details: 'Bringing the knowledge',
      examples: [
        `${env.client.prefix} sw-char luke`,
      ],
      args: [
        {
          key: 'character',
          prompt: 'Name of the character to search',
          type: 'string',
          label: 'character name',
        },
      ],
    };
  }

  constructor(client) {
    super(client, Character.options());
  }

  async run(message, { character }) {
    const response = await superagent.get('https://swapi.co/api/people').query({ search: character });
    console.log(response.body);

    return message.channel.send('Searching');
  }
}


module.exports = Character;
