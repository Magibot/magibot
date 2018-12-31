const Commando = require("discord.js-commando");


class StopCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "stop",
            group: "music",
            memberName: "stop",
            description: "Limpa a fila de música e para a música em execução."
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

        let answer = this.stop(msg.guild.id);
        msg.channel.send(answer);
    }

    stop(guildId) {
        let currentServer = global.servers[guildId];
        if (currentServer && currentServer.dispatcher) {
            currentServer.clearQueue();
            currentServer.dispatcher.end();
        }

        return `**Fila limpa e música parada** com sucesso`;
    }
}

module.exports = StopCommand;
