const Commando = require("discord.js-commando");
const Discord = require("discord.js");
const config = require("../../config/config.js");


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
            .setColor(config.botconfig.mainColor);

        msg.channel.send(info);
    }
}

module.exports = InfoCommand;
