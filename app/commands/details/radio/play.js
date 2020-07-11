const options = (prefix) => ({
  usage: `${prefix} play <url of the stream to play>`,
  name: 'play',
  group: 'radio',
  aliases: ['p', 'start', 'song', 'video', 'stream'],
  memberName: 'play',
  description: 'Play the sound of a video stream to all users in voice channel. If something is already playing, the video will be added to a queue',
  details: 'Everyone should enjoy some music',
  examples: [
    `${prefix} play http://youtube.com/link-to-your-favorite-song`,
  ],
  guildOnly: true,
  // args: [
  //   {
  //     key: 'url',
  //     prompt: 'Link (url) of a stream to play the sound of the video',
  //     type: 'string',
  //     // Validate with a URL Regex
  //     validate: (url) => {
  //       const expression = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
  //       const regex = new RegExp(expression);
  //       return url.match(regex);
  //     },
  //     label: 'url of the stream to play',
  //   },
  // ],
});

module.exports = { options };
