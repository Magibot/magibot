const options = (prefix) => ({
  subcommand: true,
  usage: `${prefix} playlist play <name-of-playlist>`,
  name: 'playlist-play',
  group: 'playlist',
  memberName: 'play',
  description: 'Play the saved playlist in your voice channel',
  details: 'Better than Spotify',
  examples: [
    `${prefix} playlist play friends`,
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
