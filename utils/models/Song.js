class Song {
    constructor(url, addedBy, info) {
        this.__url = url;
        this.__addedBy = addedBy;
        this.__info = info;
    }

    get url() {
        return this.__url;
    }

    get addedBy() {
        return this.__addedBy;
    }

    get info() {
        return this.__info;
    }
}

module.exports = Song;
