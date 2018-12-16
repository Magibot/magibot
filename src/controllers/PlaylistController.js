const mongojs = require("mongojs");
const db = mongojs(process.env.MONGODB, ['playlists']);

class PlaylistController {

    static createNewPlaylist(playlist) {
        return new Promise((resolve, reject) => {
            db.playlists.save(playlist, (error, playlist) => {
                if (error) {
                    return reject(error);
                }

                resolve(playlist);
            });
        });
    }

    static deletePlaylistByaName(playlistName, guildId) {
        return new Promise((resolve, reject) => {
            db.playlists.findOne({ name: playlistName, guildId: guildId }, (error, playlist) => {
                if (error) {
                    return reject(error);
                }

                db.playlists.remove({ name: playlistName, guildId: guildId }, (error, deleteInfo) => {
                    if (error) {
                        return reject(error);
                    }
    
                    resolve(playlist);
                });
            });
        });
    }
}

module.exports = PlaylistController;

