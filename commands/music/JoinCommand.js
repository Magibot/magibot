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
        if (voiceChannel && !msg.guild.voiceConnection) {
            voiceChannel.join().then(conn => {
                msg.channel.send(`Conectado ao \`${voiceChannel.name}\` com sucesso. :yum:`);
            }).catch(err => {
                msg.channel.send(`Não foi possível se conectar ao canal \`${voiceChannel.name}\`. :disappointed_relieved:`);
            });
        } else {
            msg.channel.send(`Você deve estar conectado a um canal de voz para executar este comando.`);
        }
    }
}

module.exports = JoinCommand;
