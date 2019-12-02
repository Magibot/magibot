const options = (prefix) => ({
  usage: `${prefix} pause`,
  name: 'pause',
  group: 'radio',
  memberName: 'pause',
  description: 'Pause the stream playing. It can be resumed back with the command resume',
  details: 'Crash the people\'s fun',
  examples: [
    `${prefix} pause`,
  ],
  guildOnly: true,
});

module.exports = { options };
