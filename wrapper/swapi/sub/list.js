const options = (prefix) => ({
  subcommand: true,
  usage: `${prefix} swapi list <name-of-collection>`,
  name: 'swapi-list',
  group: 'swapi',
  memberName: 'list',
  description: 'List <movies>, <characters>, <planets>, <starships> of Star Wars movies',
  details: 'Bringing the knowledge',
  examples: [
    `${prefix} swapi list characters`,
    `${prefix} swapi list movies`,
    `${prefix} swapi list planets`,
    `${prefix} swapi list starships`,
  ],
  args: [
    {
      key: 'collection',
      prompt: 'Name of the collection to search all elements',
      type: 'string',
      label: 'collection name',
    },
  ],
});

module.exports = { options };
