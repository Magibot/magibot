class Guild {
    constructor() {
        this.__queue = [];
        this.__dispatcher = null;
    }
    
    addSongToQueue(song) {
        this.__queue.push(song);
    }

    addSongsToQueue(songs) {
        let currentSong;
        for (let i = 0; i < songs.length; i++) {
            currentSong = songs[i];
            this.__queue.push(currentSong);
        }
    }

    shiftQueue() {
        this.__queue.shift();
    }

    clearQueue() {
        this.__queue = [];
    }

    set dispatcher(stream) {
        this.__dispatcher = stream;
    }

    get queue() {
        return this.__queue;
    }

    get dispatcher() {
        return this.__dispatcher;
    }
}

module.exports = Guild;
