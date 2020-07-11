const options = (prefix) => ({
  subcommand: true,
  usage: `${prefix} playlist create <name-of-playlist>`,
  name: 'playlist-create',
  group: 'playlist',
  memberName: 'create',
  description: 'Create a customizable playlist',
  details: 'Better than Spotify',
  examples: [
    `${prefix} playlist create friends`,
  ],
  args: [
    {
      key: 'name',
      prompt: 'Name of the playlist to play',
      type: 'string',
      label: 'name of playlist',
    },
  ],
});

module.exports = { options };
