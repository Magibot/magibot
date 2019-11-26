const Commando = require('discord.js-commando');
const superagent = require('superagent');
const env = require('../../config/env');
const embed = require('../../utils/embed');

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
    if (response.body.count === 0) {
      return message.reply(`The Star Wars character \`${character}\` was not found`);
    }

    const info = response.body.results[0];
    const reply = embed.create();
    reply
      .setTitle(info.name)
      .addField('Height', info.height, true)
      .addField('Mass', info.mass, true)
      .addField('Gender', info.gender, true)
      .addField('Hair Color', info.hair_color, true)
      .addField('Skin Color', info.skin_color, true)
      .addField('Eye Color', info.eye_color, true)
      .addField('Birth Year', info.birth_year, true)
      .addField('Appeared in', `${info.films.length} movies`, true)
      .setURL(info.url);

    return message.channel.send(reply);
  }
}


module.exports = Character;
