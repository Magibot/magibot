const Commando = require("discord.js-commando");
const Discord = require("discord.js");
const PlaylistController = require("../../controllers/PlaylistController.js");
const MusicHelper = require("../../helpers/MusicHelper.js");
const DateHelper = require("../../helpers/DateHelper.js");

class ShowPlaylistCommand extends Commando.Command {

    constructor(client) {
        super(client, {
            name: "showplaylist",
            group: "playlist",
            memberName: "showplaylist",
            description: "Exibe todas as músicas cadastradas."
        });
    }

    async run(msg, args) {
        let errorMessage = new Discord.RichEmbed();
        errorMessage
            .setTitle("Parametro do comando inválido.")
            .addField("Exemplo:", `\`${process.env.PREFIX}showplaylist <nome-da-playlist> ?<pagina>\`.`);

        if (!args) {
            return msg.channel.send(errorMessage);
        }

        let arrayArgs = args.trim().split(/ +/g);

        let playlistName = arrayArgs[0];
        let page = (arrayArgs.length > 1) ? parseInt(arrayArgs[1]) : 1;

        PlaylistController.getSongsByPlaylistName(msg.guild.id, playlistName)
            .then(async songs => {
                if (!songs || songs.length == 0) {
                    return msg.channel.send("Não músicas cadastradas para esta playlist.");
                }

                let showPages = false;
                if (songs.length > 10) {
                    showPages = true;
                }

                let answer = new Discord.RichEmbed()
                    .setTitle(`Playlist ${playlistName}`)
                    .setColor(global.config.botconfig.mainColor)
                    .addField("Total de Músicas:", songs.length);

                let totalPlaylistLength = MusicHelper.getSongListLength(songs);
                answer.addField("Tempo total:", DateHelper.fmtMSS(totalPlaylistLength));

                let allSongs = "";
                let pageEnding = (showPages) ? page * 10 : songs.length;
                let pageBegining = (showPages) ? pageEnding - 10 : 0;

                for (let i = pageBegining; i < pageEnding; i++) {
                    let song = songs[i];
                    song.addedBy = (await msg.client.fetchUser(song.addedBy)).username;

                    let songInlineInfo = MusicHelper.createStringSongInfo(i, song);
                    if (i < pageEnding - 1) {
                        songInlineInfo += "\n\n";
                    }

                    allSongs += songInlineInfo;
                }

                if (allSongs) {
                    answer.addField("Lista de Músicas:", allSongs);
                }

                if (showPages) {
                    let totalOfPages = Math.ceil(songs.length / 10);
                    answer.setFooter(`Página: ${page}/${totalOfPages}`);
                }

                return msg.channel.send(answer);
            }).catch(error => {
                msg.channel.send("Não foi possível obter dados desta playlist");
                msg.channel.send(error);
            });

    }

}

module.exports = ShowPlaylistCommand;
