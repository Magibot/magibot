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
}

module.exports = Guild;
