const Commando = require("discord.js-commando");
const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const Guild = require("../../structures/Guild.js")
const Song = require("../../structures/Song.js");
const DateHelper = require("../../helpers/DateHelper.js");
const MusicHelper = require("../../helpers/MusicHelper.js");


class PlayCommand extends Commando.Command {

    constructor(client) {
        super(client, {
            name: "play",
            group: "music",
            memberName: "play",
            description: "Toca uma música com um link como atributo."
        });
    }

    async run(msg, args) {
        let voiceChannel = msg.member.voiceChannel;
        if (!args) {
            return msg.channel.send(`Insira um parametro de pesquisa valido. Exemplo: \`!play <insira-link>\``);   
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

        if (!servers[msg.guild.id]) {
            servers[msg.guild.id] = new Guild(msg.guild.id);
        }

        let songInfo = await MusicHelper.getVideoBasicInfo(args);
        let newSong = new Song(args, msg.author.username, songInfo);
        servers[msg.guild.id].addSongToQueue(newSong);

        this.play(msg.guild.voiceConnection, msg);

        let answer;
        if (servers[msg.guild.id].queue.length > 1) {
            answer = new Discord.RichEmbed()
                .setTitle(`${newSong.info.title}`)
                .setURL(newSong.url)
                .setAuthor(`Adicionado a fila`, msg.member.user.avatarURL)
                .setColor(config.botconfig.mainColor)
                .addField("Canal", newSong.info.author.name)
                .addField("Duração", DateHelper.fmtMSS(newSong.info.length_seconds))
                .addField("Posição na fila", servers[msg.guild.id].queue.length - 1);
        }

        answer = (answer) ? answer : `**Tocando** \`${newSong.info.title}\` agora`
        msg.channel.send(answer);
    }

    play(voiceConnection, msg) {
        let currentServer = servers[msg.guild.id];
        if (currentServer.dispatcher && voiceConnection.speaking) {
            return;
        }
    
        let streamOptions = {
            volume: 0.5
        };
        let stream = YTDL(currentServer.queue[0].url, { filter: "audioonly" });
        currentServer.dispatcher = voiceConnection.playStream(stream, streamOptions);
        currentServer.dispatcher.on("end", () => {
            currentServer.shiftQueue();
            if (!currentServer.queue[0]) {
                setTimeout(() => {
                    voiceConnection.disconnect();
                    currentServer.dispatcher.destroy();
                }, 900000);
                return;
            }

            this.play(voiceConnection, msg);
        });
    }
}

module.exports = PlayCommand;
