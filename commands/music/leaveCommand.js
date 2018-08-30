const Commando = require("discord.js-commando");


class LeaveCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "leave",
            group: "music",
            memberName: "leave",
            description: "Sai do canal em que o bot está."
        });
    }

    async run(msg, args) {
        let userVoiceChannel = msg.member.voiceChannel;
        if (!msg.guild.voiceConnection) {
            msg.channel.send(`O bot deve estar em algum canal de voz para desconectar.`);
            return;
        }

        let botVoiceChannel = msg.guild.voiceConnection.channel;
        if (!userVoiceChannel || userVoiceChannel.id !== botVoiceChannel.id) {
            msg.channel.send(`Você deve estar conectado ao canal \`${botVoiceChannel.name}\` do bot para executar este comando;`);
            return;
        }

        msg.guild.voiceConnection.disconnect();
        msg.channel.send(`Desconectado de \`${msg.member.voiceChannel.name}\` com sucesso.`);
        if (servers[msg.guild.id] && servers[msg.guild.id].dispatcher) {
            servers[msg.guild.id].dispatcher.destroy();
        }

        if (servers[msg.guild.id] && servers[msg.guild.id].queue.length > 0) {
            servers[msg.guild.id].queue = [];
        }
    }
}

module.exports = LeaveCommand;
