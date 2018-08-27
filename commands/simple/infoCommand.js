const Commando = require("discord.js-commando");
const Discord = require("discord.js");


class InfoCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "info",
            group: "simple",
            memberName: "info",
            description: "Descreve informações sobre o bot."
        });
    }

    async run(msg, args) {
        var info = new Discord.RichEmbed()
            .addField("Descrição", "Bot oficial da Gaguinho Games!", true)
            .setColor(0x99e6ff);

        msg.channel.send(info);
    }
}

module.exports = InfoCommand;
