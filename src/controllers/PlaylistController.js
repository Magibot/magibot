const mongojs = require("mongojs");
const db = mongojs(process.env.MONGODB, ['playlists', 'playlistsongs']);
const Playlist = require("../models/Playlist.js");
const Song = require("../structures/Song.js");
const MusicHelper = require("../helpers/MusicHelper.js");

class PlaylistController {

    static createNewPlaylist(guildId, name, creator, allowOtherToModify) {
        return new Promise((resolve, reject) => {
            let playlist = new Playlist(guildId, name, creator, allowOtherToModify);

            db.playlists.save(playlist, (error, playlist) => {
                if (error) {
                    return reject(error);
                }

                resolve(playlist);
            });
        });
    }

    static deletePlaylistByName(playlistName, guildId) {
        return new Promise((resolve, reject) => {
            db.playlists.findOne({ name: playlistName, guildId: guildId }, (error, playlist) => {
                if (error) {
                    return reject(error);
                }

                if (!playlist) {
                    return reject("Não existe playlist com esse nome cadastrada.");
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
                    return reject("Somente o criador desta playlist pode modificá-la.");
                }

                MusicHelper.getVideoBasicInfo(songSearchString)
                    .then(songInfo => {
                        let song = new Song(songSearchString, modifierId, songInfo, playlist._id);

                        PlaylistController.getPlaylistSongs(playlist._id)
                            .then(listaDeMusicas => {
                                for (let i = 0; i < listaDeMusicas.length; i++) {
                                    let musicaCadastrada = listaDeMusicas[i];
                                    if (musicaCadastrada.info.title == song.info.title) {
                                        return reject("Esta musica já existe na playlist.");
                                    }
                                }

                                db.playlistsongs.save(song, (error, song) => {
                                    if (error) {
                                        return reject(error);
                                    }
                                    
                                    playlist.length = listaDeMusicas.length + 1;
                                    resolve(playlist);
                                });
                            });
                    });
            });
        });

    }

    static getSongsByPlaylistName(guildId, playlistName) {
        return new Promise((resolve, reject) => {
            db.playlists.findOne({ name: playlistName, guildId: guildId }, (error, playlist) => {
                if (error) {
                    return reject(error);
                }

                if (!playlist) {
                    return reject("Não existe playlist cadastrada com esse nome.");
                }

                PlaylistController.getPlaylistSongs(playlist._id)
                    .then(songs => resolve(songs))
                    .catch(error => reject(error));

            });
        });
    }

    static getPlaylistSongs(playlistId) {
        return new Promise((resolve, reject) => {
            db.playlistsongs.find({ playlistId: playlistId }, (error, songs) => {
                if (error) return reject(error);

                resolve(songs);
            })
        });
    }

    static getAllPlaylistOnGuild(guildId) {
        return new Promise((resolve, reject) => {
            db.playlists.find({ guildId: guildId }, async (error, playlists) => {
                if (error) return reject(error);

                for (let i = 0; i < playlists.length; i++) {
                    let playlist = playlists[i];
                    playlist.songs = await PlaylistController.getPlaylistSongs(playlist._id);
                }

                resolve(playlists);
            });
        });
    }
}

module.exports = PlaylistController;

