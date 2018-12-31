const Commando = require("discord.js-commando");
const Discord = require("discord.js");
const Guild = require("../../structures/Guild.js");
const Song = require("../../structures/Song.js");
const DateHelper = require("../../helpers/DateHelper.js");
const MusicHelper = require("../../helpers/MusicHelper.js");


class PlaySkipCommand extends Commando.Command {

    constructor(client) {
        super(client, {
            name: "playskip",
            group: "music",
            memberName: "playskip",
            description: "Pula a música que está tocando e toca uma música com um link passada na mensagem como parâmetro."
        });
    }

    async run(msg, args) {
        let voiceChannel = msg.member.voiceChannel;
        if (!args) {
            return msg.channel.send(`Insira um parametro de pesquisa valido. Exemplo: \`!playskip <insira-link>\``);   
        }

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

        if (!global.servers[msg.guild.id]) {
            global.servers[msg.guild.id] = new Guild(msg.guild.id);
        }

        let songInfo = await MusicHelper.getVideoBasicInfo(args);
        let newSong = new Song(args, msg.author.id, songInfo);
        global.servers[msg.guild.id].insertSongOnPosition(1, newSong);

        MusicHelper.playVideo(msg.guild.voiceConnection, msg, global.servers[msg.guild.id]);

        let songSkipped = MusicHelper.skipOnQueue(msg.guild.id);
        msg.channel.send(`Música \`${songSkipped.info.title}\` **skipada** com sucesso.`);
        msg.channel.send(`**Tocando** \`${newSong.info.title}\` agora`);
    }

}

module.exports = PlaySkipCommand;
