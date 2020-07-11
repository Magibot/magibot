const ytdlStream = require('ytdl-core-discord');
const events = require('events');
const Queue = require('../../utils/models/queue');
const youtube = require('../../services/google-api/youtube');
const helpers = require('../../utils/helpers');

class Streamer {
  constructor(guildId, channelId, voiceConnection, googleApiKey) {
    this.guildId = guildId;
    this.channelId = channelId;
    this.voiceConnection = voiceConnection;
    this.googleApiKey = googleApiKey;

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
    return helpers.formatSeconds(this.totalLenghSecondsQueue);
  }

  setup(voiceConnection) {
    this.voiceConnection = voiceConnection;
  }

  async play(args, addedBy) {
    let url;
    if (helpers.validator.isUrl(args)) {
      url = args;
    } else {
      const result = await youtube.searchVideo(this.googleApiKey, args);
      if (result.errors) {
        return { errorMessage: result.errorMessage };
      }

      url = result.url;
    }

    const info = await youtube.getVideoInformation(url);
    const video = { url, addedBy, info };
    video.duration = helpers.datetime.formatSeconds(info.lengthSeconds);

    if (this.isPlaying || this.isPaused) {
      const stream = this.insertIntoQueue(video);
      return { stream };
    }

    const stream = this.execute(video);
    return { stream };
  }

  async execute(stream) {
    const video = stream;
    this.voiceConnection.playOpusStream(await ytdlStream(video.url));

    this.state = 'playing';
    video.status = 'playing';
    video.positionOnQueue = 0;
    this.videoPlaying = video;

    this.updateQueue();

    this.voiceConnection.dispatcher.on('end', () => this.events.emit('stream-finished'));
    return video;
  }

  updateQueue() {
    if (this.totalOfElementsInQueue > 0) {
      for (let i = 0; i < this.totalOfElementsInQueue; i += 1) {
        const stream = this.queue.q[i];
        stream.positionOnQueue -= 1;
      }
    }
  }

  insertIntoQueue(info) {
    const video = info;
    video.status = 'queued';
    video.positionOnQueue = this.queue.insert(video) + 1;
    return video;
  }

  clearQueue() {
    this.queue.clear();
  }

  disconnect() {
    this.stop();
    if (this.voiceConnection) {
      this.destroyDispatcher();
      this.voiceConnection.disconnect();
    }

    this.voiceConnection = null;
  }

  pause() {
    if (this.voiceConnection && this.voiceConnection.dispatcher) {
      this.voiceConnection.dispatcher.pause();
    }

    this.state = 'paused';
    this.videoPlaying.status = 'paused';
  }

  stop() {
    this.destroyDispatcher();
    this.state = 'stopped';
    this.clearQueue();
    this.videoPlaying = null;
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
      aboutPlayingNow: helpers.formatter.getVideoStringInlineInfo(0, this.videoPlaying),
      totalLenghSecondsQueue,
      totalDuration: helpers.datetime.formatSeconds(totalLenghSecondsQueue),
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

  removeFromQueue(index) {
    if (this.totalOfElementsInQueue === 0) {
      return null;
    }

    return this.queue.remove(index);
  }

  resume() {
    if (this.voiceConnection && this.voiceConnection.dispatcher) {
      this.voiceConnection.dispatcher.resume();
    }

    this.state = 'playing';
    this.videoPlaying.status = 'playing';
  }

  async skip() {
    let next = null;
    if (this.totalOfElementsInQueue > 0) {
      next = this.queue.head;
    }

    if (this.voiceConnection && this.voiceConnection.dispatcher) {
      this.voiceConnection.dispatcher.end();
    }

    return next;
  }

  // Events handlers

  handleStreamFinish() {
    const next = this.queue.next();
    if (!next) {
      this.stop();
      this.disconnect();
      return;
    }

    this.execute(next);
  }
}

module.exports = Streamer;
