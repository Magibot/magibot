const Streamer = require('./streamer');

class Radio {
  constructor() {
    this.streams = new Map();
  }

  createStream(guildId, channelId, voiceConnection) {
    if (this.streams.has(guildId)) {
      const streamer = this.getStream(guildId);
      streamer.setup(voiceConnection);
      return streamer;
    }

    const streamer = new Streamer(guildId, channelId, voiceConnection);
    this.streams.set(guildId, streamer);
    return streamer;
  }

  getStream(guildId) {
    return this.streams.get(guildId);
  }

  destroyStream(guildId) {
    return this.streams.delete(guildId);
  }
}

module.exports = Radio;
