class Song {
  constructor(url, addedBy, info, playlistId = null) {
    this.url = url;
    this.addedBy = addedBy;
    this.info = info;
    this.playlistId = playlistId;
  }
}

module.exports = Song;
