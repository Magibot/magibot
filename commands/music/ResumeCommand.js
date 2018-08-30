const Commando = require("discord.js-commando");
const YTDL = require("ytdl-core");


class ResumeCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "resume",
            group: "music",
            memberName: "resume",
            description: "Continua a música que estava tocando de onde parou."
        });
    }

    async run(msg, args) {
        let voiceChannel = msg.member.voiceChannel;
        if (msg.guild.voiceConnection && voiceChannel.position != msg.guild.voiceConnection.channel.position) {
            msg.channel.send(`Você deve estar no mesmo canal de voz do bot para executar este comando.`);
            return;
        }

        if (!servers[msg.guild.id] || servers[msg.guild.id].queue.length == 0) {
            msg.channel.send(`Não há música na fila.`);
            return;
        }

        if (!servers[msg.guild.id].dispatcher.paused || servers[msg.guild.id].dispatcher.speaking) {
            msg.channel.send(`A música já está tocando.`);
            return;
        }

        servers[msg.guild.id].dispatcher.resume();
        msg.channel.send(`A música foi resumido.`);
    }
}

module.exports = ResumeCommand;
