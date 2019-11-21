const ytdl = require('ytdl-core');
const ytdlStream = require('ytdl-core-discord');
const events = require('events');
const Queue = require('./queue');

class Streamer {
  constructor(guildId, channelId, voiceConnection) {
    this.guildId = guildId;
    this.channelId = channelId;
    this.voiceConnection = voiceConnection;

    this.queue = new Queue();
    this.state = 'stopped';

    this.timeout = 900000;

    this.videoPlaying = null;

    this.events = new events.EventEmitter();
    this.events.on('stream-finished', this.handleStreamFinish.bind(this));
  }

  get isPlaying() {
    return this.state === 'playing';
  }

  get isPaused() {
    return this.state === 'paused';
  }

  get isStopped() {
    return this.state === 'stopped';
  }

  get totalOfElementsInQueue() {
    return this.queue.totalOfElements();
  }

  setup(voiceConnection) {
    this.voiceConnection = voiceConnection;
  }

  async play(url, addedBy) {
    const info = await Streamer.getVideoInformation(url);
    const video = { url, addedBy, info };
    let lengthSeconds = info.length_seconds;
    video.duration = (lengthSeconds - (lengthSeconds %= 60)) / 60 + (lengthSeconds > 9 ? ':' : ':0') + lengthSeconds;

    if (this.isPlaying || this.isPaused) {
      return this.insertIntoQueue(video);
    }

    this.state = 'playing';
    this.voiceConnection.playOpusStream(await ytdlStream(url));
    this.voiceConnection.dispatcher.on('end', () => this.events.emit('stream-finished'));
    video.status = 'playing';
    this.videoPlaying = video;
    return video;
  }

  insertIntoQueue(info) {
    const video = info;
    video.status = 'queued';
    video.positionOnQueue = this.queue.insert(video);
    return video;
  }

  clearQueue() {
    this.queue.clear();
  }

  disconnect() {
    if (this.voiceConnection) {
      if (this.voiceConnection.dispatcher) {
        this.voiceConnection.dispatcher.destroy();
      }

      this.voiceConnection.disconnect();
    }

    this.voiceConnection = null;
  }

  pause() {
    this.state = 'paused';
    this.voiceConnection.dispatcher.pause();
  }

  stop() {
    this.state = 'stopped';
    this.clearQueue();
    this.videoPlaying = null;
    this.voiceConnection = null;
  }

  // Events handlers

  handleStreamFinish() {
    const next = this.queue.next();
    if (!next) {
      this.stop();

      setTimeout(() => {
        this.disconnect();
      }, this.timeout);
    }

    this.videoPlaying = next;
    this.play(next);
  }

  // Statics methods

  static async getVideoInformation(url) {
    return new Promise((resolve, reject) => {
      ytdl.getBasicInfo(url, (err, info) => {
        if (err) {
          reject(err);
          return;
        }

        const videoInfo = {
          title: info.title,
          author: info.author,
          length_seconds: info.length_seconds,
          url,
        };

        resolve(videoInfo);
      });
    });
  }
}

module.exports = Streamer;
