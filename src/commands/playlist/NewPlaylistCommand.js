const Commando = require("discord.js-commando");
const Discord = require("discord.js");
const Playlist = require("../../models/Playlist.js");
const PlaylistController = require("../../controllers/PlaylistController.js");

class NewPlaylistCommand extends Commando.Command {

    constructor(client) {
        super(client, {
            name: "newplaylist",
            group: "playlist",
            memberName: "newplaylist",
            description: "Cadastra uma nova playlist para aquele servidor."
        });
    }

    // !newplaylist <nome-da-playlist>
    async run(msg, args) {
        let answer = new Discord.RichEmbed();
        if (!args) {
            answer
                .setTitle("Parametro de cadastro inválido.")
                .addField("Exemplo:", `\`!newplaylist <nome-da-playlist> ?<outros-podem-modificar>\`.`)
                .addField(`Se outros podem modificar sua playlist insira \`1\` se não podem, insira \`0\`. Exemplo:`, `\`!newplaylist kpop 1\`.`)
                .setFooter("Este parametro <outros-podem-modificar> é opcional e por padrão será 0", "");
            return msg.channel.send(answer);
        }

        let arrayArgs = args.trim().split(/ +/g);

        let playlistName;
        let allowOtherToModify;
        if (arrayArgs.length == 1) {
            playlistName = arrayArgs[0];
            allowOtherToModify = true;
        }

        if (arrayArgs.length > 1) {
            playlistName = arrayArgs[0];
            allowOtherToModify = (parseInt(arrayArgs[1]) == 1) ? true : false; 
        }

        if (!playlistName || allowOtherToModify == null) {
            return msg.channel.send("Parametros de criação de playlist inválidos.");
        }

        let guildId = msg.guild.id;
        let creator = msg.author.id;

        let playlist = new Playlist(guildId, playlistName, creator, allowOtherToModify);
        PlaylistController.createNewPlaylist(playlist)
            .then((playlist) => {
                answer
                    .setTitle("Playlist criada com sucesso.")
                    .addField("Id da playlist:", `\`${playlist._id}\``)
                    .addField("Adição de música:", `\`!addsongto ${playlist.name} <link-da-musica>\`.`)
                    .addField(`Remoção de música:`, `\`!removesong ${playlist.name} <id-da-musica>\`.`)
                    .addField("Tocar playlist:", `\`!playlist ${playlist.name}\``)
                    .addField("Exibir playlist:", `\`!showplaylist ${playlist.name}\``)
                    .addField("Excluindo a playlist:", `\`!delplaylist ${playlist.name}\``);
                msg.channel.send(answer);
            })
            .catch((error) => {
                msg.channel.send("Não foi possível criar esta playlist.");
            });
    }

}

module.exports = NewPlaylistCommand;
