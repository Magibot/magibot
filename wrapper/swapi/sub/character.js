const options = (prefix) => ({
  subcommand: true,
  usage: `${prefix} swapi character <name-of-character-from-star-wars>`,
  name: 'swapi-character',
  group: 'swapi',
  memberName: 'character',
  description: 'Returns information about a character from Star Wars movies',
  details: 'Bringing the knowledge',
  examples: [
    `${prefix} swapi character luke`,
  ],
  args: [
    {
      key: 'character',
      prompt: 'Name of the character to search',
      type: 'string',
      label: 'character name',
    },
  ],
});

module.exports = { options };
