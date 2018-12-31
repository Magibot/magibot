const Commando = require("discord.js-commando");
const Discord = require("discord.js");
const PlaylistController = require("../../controllers/PlaylistController.js");

class AddSongToPlaylistCommand extends Commando.Command {

    constructor(client) {
        super(client, {
            name: "addsongto",
            group: "playlist",
            memberName: "addsongto",
            description: "Adiciona musica a playlist existente."
        });
    }

    async run(msg, args) {
        let errorMessage = new Discord.RichEmbed();
        errorMessage
            .setTitle("Parametro do comando inválido.")
            .addField("Exemplo:", `\`!addsongto <nome-da-playlist> <link-da-musica>\`.`);

        if (!args) {
            return msg.channel.send(errorMessage);
        }

        let arrayArgs = args.trim().split(/ +/g);

        if (arrayArgs.length < 2) {
            return msg.channel.send(errorMessage);
        }

        let playlistName = arrayArgs[0];
        let songSearchString = arrayArgs[1];

        if (!playlistName) {
            return msg.channel.send("Parametros para adição de música em playlists inválidos.");
        }

        PlaylistController.addSongToPlaylist(playlistName, msg.guild.id, msg.author.id, songSearchString)
            .then((playlist) => {
                let answer = new Discord.RichEmbed();
                answer
                    .setTitle("Playlist atualizada com sucesso. Nova música adicionada")
                    .setColor(global.config.botconfig.mainColor)
                    .addField("ID da playlist:", `\`${playlist._id}\``)
                    .addField("Nome da playlist:", `\`${playlist.name}\`.`)
                    .addField(`Quantidade de músicas:`, `\`${playlist.length}\`.`);

                msg.channel.send(answer);
            })
            .catch((error) => {
                msg.channel.send("Não foi possível adicionar esta musica a esta playlist.");
                msg.channel.send(error);
            });
    }

}

module.exports = AddSongToPlaylistCommand;
