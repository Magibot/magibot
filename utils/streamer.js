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
    this.totalTime = 0;

    this.timeout = 900000;

    this.videoPlaying = null;

    this.events = new events.EventEmitter();
    this.events.on('stream-finished', this.handleQueue.bind(this));
  }

  get isPlaying() {
    return this.state === 'playing';
  }

  async play(url, addedBy) {
    const info = await Streamer.getVideoInformation(url);
    const video = { url, addedBy, info };
    let lengthSeconds = info.length_seconds;
    video.duration = (lengthSeconds - (lengthSeconds %= 60)) / 60 + (lengthSeconds > 9 ? ':' : ':0') + lengthSeconds;

    if (this.state === 'playing' || this.state === 'paused') {
      video.positionOnQueue = this.queue.insert(video);
      video.status = 'queued';
      return video;
    }

    this.state = 'playing';
    this.voiceConnection.playOpusStream(await ytdlStream(url));
    this.voiceConnection.dispatcher.on('end', () => this.events.emit('stream-finished'));
    this.videoPlaying = video;
    video.status = 'playing';
    return video;
  }

  handleQueue() {
    const next = this.queue.next();
    if (!next) {
      setTimeout(() => {
        this.voiceConnection.disconnect();
        this.voiceConnection.dispatcher.destroy();
        this.state = 'stopped';
      }, this.timeout);
    }

    this.videoPlaying = next;
    this.play(next);
  }

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
