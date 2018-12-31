const Commando = require("discord.js-commando");
const Discord = require("discord.js");
const PlaylistController = require("../../controllers/PlaylistController.js");
const Guild = require("../../structures/Guild.js");
const MusicHelper = require("../../helpers/MusicHelper.js");

class PushPlaylistCommand extends Commando.Command {

    constructor(client) {
        super(client, {
            name: "pushplaylist",
            group: "playlist",
            memberName: "pushplaylist",
            description: "Insere uma playlist na fila atual de músicas."
        });
    }

    async run(msg, args) {
        let answer = new Discord.RichEmbed();

        let voiceChannel = msg.member.voiceChannel;
        if (!voiceChannel) {
            return msg.channel.send(`Você deve estar conectado a um canal de voz para executar este comando.`);
        }

        if (msg.guild.voiceConnection && voiceChannel.position != msg.guild.voiceConnection.channel.position) {
            return msg.channel.send(`Você deve estar no mesmo canal de voz do bot.`);
        }

        if (!msg.guild.voiceConnection) {
            voiceChannel.join().then(conn => {
                msg.channel.send(`**Conectado ao** \`${voiceChannel.name}\` com sucesso. :yum:`);
            }).catch(err => {
                msg.channel.send(`Não foi possível se conectar ao canal \`${voiceChannel.name}\`. :disappointed_relieved:`);
            });
        }

        if (!args || args.length < 1) {
            answer
                .setTitle("Parametro do comando inválido.")
                .addField("Exemplo:", `\`${process.env.PREFIX}playlist <nome-da-playlist>\`.`);
            return msg.channel.send(answer);
        }

        let arrayArgs = args.trim().split(/ +/g);

        let playlistName = arrayArgs[0];

        if (!playlistName) {
            return msg.channel.send("Parametros para execução de playlist inválidos.");
        }

        let guildId = msg.guild.id;
        if (!global.servers[guildId]) {
            global.servers[guildId] = new Guild(guildId);
        }

        let songs = await PlaylistController.getSongsByPlaylistName(guildId, playlistName);
        global.servers[guildId].addSongsToQueue(songs);
        MusicHelper.playVideo(msg.guild.voiceConnection, msg, global.servers[msg.guild.id]);
        msg.channel.send(`**Playlist** \`${playlistName}\` inserida a fila.`);

    }

}

module.exports = PushPlaylistCommand;
