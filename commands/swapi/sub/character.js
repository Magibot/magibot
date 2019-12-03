const characterEmbed = (client, character) => {
  const info = client.customEmbed.create();
  info
    .setTitle(character.name)
    .addField('Height', character.height, true)
    .addField('Mass', character.mass, true)
    .addField('Gender', character.gender, true)
    .addField('Hair Color', character.hair_color, true)
    .addField('Skin Color', character.skin_color, true)
    .addField('Eye Color', character.eye_color, true)
    .addField('Birth Year', character.birth_year, true)
    .addField('Appeared in', `${character.films.length} movies`, true)
    .setURL(character.url);

  return info;
};

const handle = async (client, message, args) => {
  if (!args || args.length === 0) {
    return message.reply('You should inform a name of a Star Wars character to search');
  }

  const [search] = args;

  const { status, payload } = await client.services.swapi.characters({ search });
  if (status === 'notfound') {
    return message.reply(`The Star Wars character \`${search}\` was not found`);
  }

  const [character] = payload;
  return message.channel.send(characterEmbed(client, character));
};

module.exports = { handle };
