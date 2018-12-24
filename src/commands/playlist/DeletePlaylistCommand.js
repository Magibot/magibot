const Commando = require("discord.js-commando");
const Discord = require("discord.js");
const PlaylistController = require("../../controllers/PlaylistController.js");

class DeletePlaylistCommand extends Commando.Command {

    constructor(client) {
        super(client, {
            name: "delplaylist",
            group: "playlist",
            memberName: "delplaylist",
            description: "Exclui uma playlist do servidor."
        });
    }

    async run(msg, args) {
        let answer = new Discord.RichEmbed();
        if (!args) {
            answer
                .setTitle("Parametro do comando inválido.")
                .addField("Exemplo:", `\`${process.env.PREFIX}delplaylist <nome-da-playlist>\`.`);
            return msg.channel.send(answer);
        }

        let arrayArgs = args.trim().split(/ +/g);

        let playlistName;
        if (arrayArgs.length > 0) {
            playlistName = arrayArgs[0];
        }

        if (!playlistName) {
            return msg.channel.send("Parametros para exclusão de playlist inválidos.");
        }

        PlaylistController.deletePlaylistByName(playlistName, msg.guild.id)
            .then((playlist) => {
                answer
                    .setTitle("Playlist excluída com sucesso.")
                    .addField("ID da playlist:", `\`${playlist._id}\``)
                    .addField("Nome da playlist:", `\`${playlist.name}\`.`)
                    .addField(`Quantidade de músicas:`, `\`${playlist.songs.length}\`.`);

                msg.channel.send(answer);
            })
            .catch((error) => {
                msg.channel.send("Não foi possível excluir esta playlist.");
                msg.channel.send(error);
            });
    }

}

module.exports = DeletePlaylistCommand;
