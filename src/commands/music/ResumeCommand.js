const Commando = require("discord.js-commando");


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
            return msg.channel.send(`Você deve estar no mesmo canal de voz do bot para executar este comando.`);
        }

        if (!global.servers[msg.guild.id] || global.servers[msg.guild.id].queue.length == 0) {
            return msg.channel.send(`Não há música na fila.`);
        }

        if (!global.servers[msg.guild.id].dispatcher.paused || global.servers[msg.guild.id].dispatcher.speaking) {
            return msg.channel.send(`A música já está tocando.`);
        }

        global.servers[msg.guild.id].dispatcher.resume();
        msg.channel.send(`A música foi resumido.`);
    }
}

module.exports = ResumeCommand;
