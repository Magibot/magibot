const Commando = require("discord.js-commando");


class JoinCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "join",
            group: "music",
            memberName: "join",
            description: "Entra no canal do usuario que realizou o comando"
        });
    }

    async run(msg, args) {
        let voiceChannel = msg.member.voiceChannel;
        if (!voiceChannel) {
            return msg.channel.send(`Você deve estar conectado a um canal de voz para executar este comando.`);
        }

        if (msg.guild.voiceConnection) {
            return msg.channel.send(`O bot já está conectado no canal \`${msg.guild.voiceConnection.channel.name}\``);
        }

        voiceChannel.join().then(conn => {
            msg.channel.send(`Conectado ao \`${voiceChannel.name}\` com sucesso. :yum:`);
        }).catch(err => {
            msg.channel.send(`Não foi possível se conectar ao canal \`${voiceChannel.name}\`. :disappointed_relieved:`);
        });
    }
}

module.exports = JoinCommand;
