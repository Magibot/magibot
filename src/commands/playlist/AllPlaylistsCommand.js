const Commando = require("discord.js-commando");
const Discord = require("discord.js");
const PlaylistController = require("../../controllers/PlaylistController.js");
const MusicHelper = require("../../helpers/MusicHelper.js");


class ShowPlaylistCommand extends Commando.Command {

    constructor(client) {
        super(client, {
            name: "allplaylists",
            group: "playlist",
            memberName: "allplaylists",
            description: "Exibe todas as playlists cadastradas no servidor."
        });
    }

    async run(msg, args) {
        let guildId = msg.guild.id;

        PlaylistController.getAllPlaylistOnGuild(guildId)
            .then(async playlists => {
                if (!playlists || playlists.length == 0) {
                    return msg.channel.send('Não existe playlists cadastradas para este servidor.');
                }

                let answer = new Discord.RichEmbed()
                    .setTitle(`Playlists de ${msg.guild.name}`)
                    .setColor(global.config.botconfig.mainColor);


                let allPlaylists = '';

                for (let i = 0; i < playlists.length; i++) {
                    let playlist = playlists[i];
                    let creatorUsername = (await msg.client.fetchUser(playlist.creator)).username;

                    let playlistLength = MusicHelper.getSongListLength(playlist.songs);

                    let playlistString = `\`${i}.\` **Nome:** \`${playlist.name}\` | **Total de Músicas:** \`${playlist.songs.length}\` | **Tempo total:** \`${playlistLength}\` | **Criada por:** \`${creatorUsername}\``;
                    if (i < playlists.length - 1) {
                        playlistString += "\n\n";
                    }

                    allPlaylists += playlistString;
                }

                if (allPlaylists) {
                    answer.addField("Lista de Playlists:", allPlaylists);
                }

                return msg.channel.send(answer);
            }).catch(error => {
                msg.channel.send("Não foi possível obter dados deste servidor.");
                msg.channel.send(error);
            });

    }

}

module.exports = ShowPlaylistCommand;
