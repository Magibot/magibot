const inlineCharacter = (person) => `${person.height}cm | ${person.mass}kg | hair: ${person.hair_color} | eyes: ${person.eye_color} | gender: ${person.gender}`;

const listCharactersMessage = (client, characters) => {
  if (characters.length === 0) {
    return 'No Star Wars characters was found';
  }

  const embed = client.customEmbed.create();
  const { url } = characters[0];
  embed
    .setTitle(`Total of ${characters.length} characters`)
    .setURL(url.substring(0, url.length - 2));

  characters.forEach((char) => {
    embed.addField(char.name, inlineCharacter(char));
  });

  return embed;
};

const handle = async (client, message, args) => {
  if (!args || args.length === 0) {
    return message.reply('You should inform a name of a collection to show all it\'s elements');
  }

  const [collection] = args;

  let response;
  let reply;
  switch (collection) {
    case 'characters': {
      response = await client.services.swapi.characters();
      reply = listCharactersMessage(client, response.payload);
      break;
    }
    case 'movies': {
      response = await client.services.swapi.movies();
      console.log(response.payload);
      break;
    }
    default:
      return message.reply('Invalid collection name. Please use <characters>, <planets>, <movies>, <starships>');
  }

  return message.channel.send(reply);
};

module.exports = { handle };
