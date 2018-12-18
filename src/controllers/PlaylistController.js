const mongojs = require("mongojs");
const db = mongojs(process.env.MONGODB, ['playlists']);
const Playlist = require("../models/Playlist.js");

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

    static addSongToPlaylist(playlistName, guildId, modifierId, songSearchString) {
        return new Promise((resolve, reject) => {
            db.playlists.findOne({ name: playlistName, guildId: guildId }, (error, playlist) => {
                if (error) {
                    return reject(error);
                }

                if (playlist.creator != modifierId && !playlist.allowOtherToModify) {
                    return reject(new TypeError("Somente o criador desta playlist pode modificá-la."));
                }

                let updPlaylist = new Playlist(guildId, playlistName, playlist.creator, playlist.allowOtherToModify);
                let songs = playlist.songs;
                updPlaylist.insereMusicas(songs);

                db.playlists.update({ _id: playlist._id }, updPlaylist, {}, (error, updateInfo) => {
                    if (error) {
                        return reject(error);
                    }

                    updPlaylist._id = playlist._id;
            
                    resolve(updPlaylist);
                });
            });
        });
    }
}

module.exports = PlaylistController;

