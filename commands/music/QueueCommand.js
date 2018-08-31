const Commando = require("discord.js-commando");
const Discord = require("discord.js");
const config = require("../../config/config.js");


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
        let answer = new Discord.RichEmbed()
            .setTitle(`Fila de ${msg.guild.name}`, ".")
            .setColor(config.botconfig.mainColor)
            .addField("Tocando agora", currentServer.queue[0]);
        
        if (currentServer.queue.length <= 1) {
            return;
        }

        let allSongs = "";
        let currentSong;
        let songInfo;
        for (let i = 1; i < currentServer.queue.length; i++) {
            currentSong = currentServer.queue[i];
            songInfo = `\`${i}.\` ${currentSong}`;
            if (i < currentServer.queue.length - 1) {
                songInfo += "\n\n";
            }
            allSongs += songInfo;
        }
        answer.addField("Próximas:", allSongs);
        answer.setFooter(`${currentServer.queue.length - 1} músicas na fila.`);
        msg.channel.send(answer);
    }
}

module.exports = QueueCommand;
