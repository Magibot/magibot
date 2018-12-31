const Commando = require("discord.js-commando");


class PauseCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "pause",
            group: "music",
            memberName: "pause",
            description: "Pausa a música que está tocando no momento."
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

        if (global.servers[msg.guild.id].dispatcher.paused) {
            return msg.channel.send(`Fila já está pausada.`);
        }

        global.servers[msg.guild.id].dispatcher.pause();
        msg.channel.send(`Música pausada.`);
    }
}

module.exports = PauseCommand;
