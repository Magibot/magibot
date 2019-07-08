const YTDL = require('ytdl-core');
const config = require('../config');

exports.getVideoBasicInfo = async (videoUrl) => {
  const info = await YTDL.getBasicInfo(videoUrl);
  const { title, author } = info;

  return { title, author, length: info.length_seconds };
};

exports.playVideo = (voiceConnection, msg) => {
  const guild = global.guilds[msg.guild.id];
  if (guild.music.dispatcher && voiceConnection.speaking) {
    return {};
  }

  const song = guild.music.queue.shift();
  guild.music.songPlaying = song;

  const streamOptions = {
    volume: 0.5,
  };
  const stream = YTDL(song.url, { filter: 'audioonly' });
  guild.music.dispatcher = voiceConnection.playStream(stream, streamOptions);
  guild.music.dispatcher.on('end', () => {
    const nextSong = guild.music.queue.shift();
    if (!nextSong) {
      setTimeout(() => {
        voiceConnection.disconnect();
        guild.music.dispatcher.destroy();
      }, config.music.timeout);
      return {};
    }

    return this.playVideo(voiceConnection, msg);
  });
  return {};
};
