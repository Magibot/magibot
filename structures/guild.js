const Queue = require('./queue');

class Guild {
  constructor(id) {
    this.id = id;
    this.music = {
      songPlaying: null,
      queue: new Queue(),
      dispatcher: null,
    };
  }

  resetMusicSettings() {
    this.music.songPlaying = null;
    this.music.queue = new Queue();
    if (this.music.dispatcher) {
      this.music.dispatcher.destroy();
    }
    this.music.dispatcher = null;
  }
}

module.exports = Guild;
