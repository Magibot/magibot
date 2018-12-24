const Commando = require("discord.js-commando");
const Discord = require("discord.js");
const PlaylistController = require("../../controllers/PlaylistController.js");

class NewPlaylistCommand extends Commando.Command {

    constructor(client) {
        super(client, {
            name: "newplaylist",
            group: "playlist",
            memberName: "newplaylist",
            description: "Cadastra uma nova playlist para o servidor."
        });
    }

    async run(msg, args) {
        let answer = new Discord.RichEmbed();
        if (!args) {
            answer
                .setTitle("Parametro de cadastro inválido.")
                .addField("Exemplo:", `\`${process.env.PREFIX}newplaylist <nome-da-playlist> ?<outros-podem-modificar>\`.`)
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

        PlaylistController.createNewPlaylist(guildId, playlistName, creator, allowOtherToModify)
            .then((playlist) => {
                answer
                    .setTitle("Playlist criada com sucesso.")
                    .addField("ID da playlist:", `\`${playlist._id}\``)
                    .addField("Adição de música:", `\`${process.env.PREFIX}addsongto ${playlist.name} <link-da-musica>\`.`)
                    .addField(`Remoção de música:`, `\`${process.env.PREFIX}removesong ${playlist.name} <id-da-musica>\`.`)
                    .addField("Tocar playlist:", `\`${process.env.PREFIX}playlist ${playlist.name}\``)
                    .addField("Exibir playlist:", `\`${process.env.PREFIX}showplaylist ${playlist.name}\``)
                    .addField("Excluindo a playlist:", `\`${process.env.PREFIX}delplaylist ${playlist.name}\``);
                    
                msg.channel.send(answer);
            })
            .catch((error) => {
                msg.channel.send("Não foi possível criar esta playlist.");
            });
    }

}

module.exports = NewPlaylistCommand;
