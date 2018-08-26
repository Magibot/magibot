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
        if (msg.guild.voiceConnection) {
            let botVoiceChannel = msg.guild.voiceConnection.channel;
            if (userVoiceChannel && userVoiceChannel.id === botVoiceChannel.id) {
                msg.guild.voiceConnection.disconnect();
                msg.channel.send(`Desconectado de \`${msg.member.voiceChannel.name}\` com sucesso.`);
            } else {
                msg.channel.send(`Você deve estar no mesmo canal do bot \`${botVoiceChannel.name}\` para executar este comando.`);
            }
        } else {
            msg.channel.send(`O bot deve estar em algum canal de voz para desconectar.`);
        }
    }
}

module.exports = LeaveCommand;