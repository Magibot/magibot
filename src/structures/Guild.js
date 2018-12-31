class Guild {
    constructor(id) {
        this.__id = id;
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
        let songPlaying = this.__queue[0];
        this.__queue = [];
        if (songPlaying) {
            this.__queue.push(songPlaying);
        }
    }

    insertSongOnPosition(index, song) {
        this.__queue.insert(index, song);
    }
    
    destroyQueue() {
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

    get id() {
        return this.__id;
    }
}

module.exports = Guild;
