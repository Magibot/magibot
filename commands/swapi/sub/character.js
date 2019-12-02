const superagent = require('superagent');
const embed = require('../../../utils/embed');

const inlineCharacter = (person) => `${person.height}cm | ${person.mass}kg | hair: ${person.hair_color} | eyes: ${person.eye_color} | gender: ${person.gender}`;

const search = async (message, character) => {
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
};

const all = async (message) => {
  const endpoint = 'https://swapi.co/api/people';
  const response = await superagent.get(endpoint);
  const { count, results } = response.body;
  if (count === 0) {
    return message.reply('No Star Wars characters was found');
  }

  const reply = embed.create();
  reply
    .setTitle(`Total of ${count} characters`)
    .setURL(endpoint);

  results.forEach((person) => {
    reply.addField(person.name, inlineCharacter(person));
  });

  return message.channel.send(reply);
};

module.exports = { search, all };
