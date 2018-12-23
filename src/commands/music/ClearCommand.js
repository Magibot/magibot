const Commando = require("discord.js-commando");


class ClearCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "clear",
            group: "music",
            memberName: "clear",
            description: "Limpa a fila de música."
        });
    }

    async run(msg, args) {
        let userVoiceChannel = msg.member.voiceChannel;
        if (!msg.guild.voiceConnection) {
            return msg.channel.send(`O bot deve estar em algum canal de voz para desconectar.`);
        }

        let botVoiceChannel = msg.guild.voiceConnection.channel;
        if (!userVoiceChannel || userVoiceChannel.id !== botVoiceChannel.id) {
            return msg.channel.send(`Você deve estar conectado ao canal \`${botVoiceChannel.name}\` do bot para executar este comando;`);
        }

        let answer = this.clear(msg.guild.id);
        msg.channel.send(answer);
    }

    clear(guildId) {
        let currentServer = global.servers[guildId];
        if (currentServer.queue.length == 1) {
            return `Apenas uma música tocando. Nenhuma na fila`;
        }

        if (currentServer && currentServer.dispatcher) {
            currentServer.clearQueue();
        }

        return `**Fila limpa** com sucesso`;
    }
}

module.exports = ClearCommand;
