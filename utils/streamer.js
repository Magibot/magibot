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
    return this.queue.totalOfElements;
  }

  get totalLenghSecondsQueue() {
    return this.queue.q.reduce((total, element) => total + element.info.lengthSeconds, 0);
  }

  get totalLenghSecondsQueueFormatMss() {
    return Streamer.formatSeconds(this.totalLenghSecondsQueue);
  }

  setup(voiceConnection) {
    this.voiceConnection = voiceConnection;
  }

  async play(url, addedBy) {
    const info = await Streamer.getVideoInformation(url);
    const video = { url, addedBy, info };
    video.duration = Streamer.formatSeconds(info.lengthSeconds);

    if (this.isPlaying || this.isPaused) {
      return this.insertIntoQueue(video);
    }

    return this.execute(video);
  }

  async execute(stream) {
    const video = stream;
    this.voiceConnection.playOpusStream(await ytdlStream(video.url));

    this.state = 'playing';
    video.status = 'playing';
    this.videoPlaying = video;

    this.voiceConnection.dispatcher.on('end', () => this.events.emit('stream-finished'));
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
      this.destroyDispatcher();
      this.voiceConnection.disconnect();
    }

    this.voiceConnection = null;
    this.stop();
  }

  pause() {
    this.state = 'paused';
    this.voiceConnection.dispatcher.pause();
    this.videoPlaying.status = 'paused';
  }

  stop() {
    this.destroyDispatcher();
    this.state = 'stopped';
    this.clearQueue();
    this.videoPlaying = null;
    this.voiceConnection = null;
  }

  destroyDispatcher() {
    if (this.voiceConnection && this.voiceConnection.dispatcher) {
      this.voiceConnection.dispatcher.destroy();
    }
  }

  showQueueInformation({ page = 1 }) {
    const { needPagination, pagination, totalOfPages } = this.queue.paginate(page);
    const { totalLenghSecondsQueue } = this;
    const queueInfo = {
      page,
      isEmpty: this.queue.isEmpty,
      elements: pagination,
      text: '',
      totalOfPages,
      playingNow: this.videoPlaying,
      aboutPlayingNow: Streamer.getVideoStringInlineInfo(0, this.videoPlaying),
      totalLenghSecondsQueue,
      totalDuration: Streamer.formatSeconds(totalLenghSecondsQueue),
      totalOfElementsInQueue: this.totalOfElementsInQueue,
      aboutPage: `Page ${page} of ${totalOfPages}`,
    };

    if (!needPagination) {
      queueInfo.text = `There's only ${pagination.length} elements in queue. No need for pagination.`;
      queueInfo.totalOfPages = 1;
      return queueInfo;
    }

    queueInfo.text = `Showing the page number ${page} of ${totalOfPages}`;
    return queueInfo;
  }

  // Events handlers

  handleStreamFinish() {
    const next = this.queue.next();
    if (!next) {
      this.stop();
      this.disconnect();
    }

    this.execute(next);
  }

  removeFromQueue(index) {
    if (this.totalOfElementsInQueue === 0) {
      return null;
    }

    return this.queue.remove(index);
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
          lengthSeconds: parseInt(info.length_seconds, 10),
          url,
        };

        resolve(videoInfo);
      });
    });
  }

  static getVideoStringInlineInfo(index, video) {
    return `\`${index}.\` ${video.info.title} | ${video.info.author.name} \`${video.duration}\` | \`Added by: ${video.addedBy.username}\``;
  }

  static formatSeconds(s) {
    let seconds = s;
    seconds = (seconds - (seconds %= 60)) / 60 + (seconds > 9 ? ':' : ':0') + seconds;
    return seconds;
  }
}

module.exports = Streamer;
