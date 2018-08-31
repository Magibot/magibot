const Commando = require("discord.js-commando");
const YTDL = require("ytdl-core");
const Guild = require("../../utils/models/Guild.js");
const Song = require("../../utils/models/Song.js");


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
            msg.channel.send(`Insira um parametro de pesquisa valido. Exemplo: \`!play <insira-link>\``);
            return;
        }

        if (!voiceChannel) {
            msg.channel.send(`Você deve estar conectado a um canal de voz para executar este comando.`);
            return;
        }

        if (msg.guild.voiceConnection && voiceChannel.position != msg.guild.voiceConnection.channel.position) {
            msg.channel.send(`Você deve estar no mesmo canal de voz do bot.`);
            return;
        }

        if (!msg.guild.voiceConnection) {
            voiceChannel.join().then(conn => {
                msg.channel.send(`Conectado ao \`${voiceChannel.name}\` com sucesso. :yum:`);
            }).catch(err => {
                msg.channel.send(`Não foi possível se conectar ao canal \`${voiceChannel.name}\`. :disappointed_relieved:`);
            });
        }

        if (!servers[msg.guild.id]) {
            servers[msg.guild.id] = new Guild();
        }

        let songInfo = await this.getVideoBasicInfo(args);
        servers[msg.guild.id].addSongToQueue(new Song(args, msg.author.username, songInfo));

        this.play(msg.guild.voiceConnection, msg);
    }

    getVideoBasicInfo(songUrl) {
        return new Promise((resolve, reject) => {
            YTDL.getBasicInfo(songUrl, (err, songInfo) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(songInfo);
            });
        });
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
            if (currentServer.queue[0]) {
                this.play(voiceConnection, msg);
            } else {
                voiceConnection.disconnect();
                currentServer.dispatcher.destroy();
            }
        });
    }
}

module.exports = PlayCommand;
