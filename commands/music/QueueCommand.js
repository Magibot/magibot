const Commando = require("discord.js-commando");
const Discord = require("discord.js");
const config = require("../../config/config.js");
const dateHelper = require("../../utils/helpers/dateGenerator.js");


class QueueCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "queue",
            group: "music",
            memberName: "queue",
            description: "Mostra a fila de música."
        });
    }

    async run(msg, args) {
        if (!servers[msg.guild.id]) {
            msg.channel.send(`Não existe músicas na fila para este servidor.`);
            return;
        }

        if (servers[msg.guild.id].queue.length == 0) {
            msg.channel.send(`A fila para este servidor está vazia.`);
            return;
        }
    
        let currentServer = servers[msg.guild.id];
        let songPlaying = currentServer.queue[0];
        let answer = new Discord.RichEmbed()
            .setTitle(`Fila de ${msg.guild.name}`, ".")
            .setColor(config.botconfig.mainColor)
            .addField("Tocando agora", this.createStringSongInfo(0, songPlaying));

        let allSongs = "";
        let songInlineInfo;
        for (let i = 1; i < currentServer.queue.length; i++) {
            let song = currentServer.queue[i];
            // video_url
            songInlineInfo = this.createStringSongInfo(i, song);
            if (i < currentServer.queue.length - 1) {
                songInlineInfo += "\n\n";
            }
            allSongs += songInlineInfo;
        }

        if (allSongs) {
            answer.addField("Próximas:", allSongs);
        }

        answer.setFooter(`${currentServer.queue.length - 1} músicas na fila.`);
        msg.channel.send(answer);
    }

    createStringSongInfo(index, song) {
        return `\`${index}.\` ${song.info.title} | ${song.info.author.name} \`${dateHelper.fmtMSS(song.info.length_seconds)}\` | \`Adicionado por: ${song.addedBy}\``;
    }
}

module.exports = QueueCommand;
