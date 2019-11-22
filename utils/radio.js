const Enmap = require('enmap');
const Streamer = require('./streamer');

class Radio {
  constructor() {
    this.streams = new Enmap({
      persistent: true,
      name: 'streams',
      fetchAll: false,
      autoFetch: true,
    });
  }

  createStream(guildId, channelId, voiceConnection) {
    let streamer = this.getStream(guildId);
    if (streamer) {
      streamer.setup(voiceConnection);
      return streamer;
    }

    streamer = new Streamer(guildId, channelId, voiceConnection);
    this.streams.set(guildId, streamer);
    return streamer;
  }

  getStream(guildId) {
    let streamer = this.streams.get(guildId);
    if (!streamer) {
      streamer = this.streams.fetch(guildId);
    }

    return streamer;
  }

  destroyStream(guildId) {
    return this.streams.delete(guildId);
  }
}

module.exports = Radio;
