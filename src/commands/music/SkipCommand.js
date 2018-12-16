const Commando = require("discord.js-commando");


class SkipCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "skip",
            group: "music",
            memberName: "skip",
            description: "Pula a música tocando no momento da execução do comando."
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

        if (!servers[msg.guild.id] || servers[msg.guild.id].queue.length == 0) {
            return msg.channel.send(`Não há música na fila.`);
        }

        let answer = this.skip(msg);
        msg.channel.send(answer);

        answer = (servers[msg.guild.id].queue.length > 0) ? `**Tocando** \`${servers[msg.guild.id].queue[0].info.title}\` agora` : `Não há mais música na fila`;
        msg.channel.send(answer);
    }

    skip(msg) {
        let currentServer = servers[msg.guild.id];
        let songPlaying = currentServer.queue[0];
        if (currentServer.dispatcher) {
            currentServer.dispatcher.end();
        }

        return `Música \`${songPlaying.info.title}\` **skipada** com sucesso.`;
    }
}

module.exports = SkipCommand;
