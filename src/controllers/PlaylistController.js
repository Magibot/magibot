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
}

module.exports = PlaylistController;

