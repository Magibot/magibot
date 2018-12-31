const Commando = require("discord.js-commando");
const Discord = require("discord.js");
const DateHelper = require("../../helpers/DateHelper.js");
const MusicHelper = require("../../helpers/MusicHelper.js");


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
        if (!global.servers[msg.guild.id]) {
            return msg.channel.send(`Não existe músicas na fila para este servidor.`);
        }

        if (global.servers[msg.guild.id].queue.length == 0) {
            return msg.channel.send(`A fila para este servidor está vazia.`);
        }

        let arrayArgs = args.trim().split(/ +/g);

        let page = (arrayArgs.length > 0 && arrayArgs[0]) ? parseInt(arrayArgs[0]) : 1;
    
        let currentServer = global.servers[msg.guild.id];
        let songPlaying = currentServer.queue[0];
        songPlaying.addedByUsername = (await msg.client.fetchUser(songPlaying.addedBy)).username;
        let answer = new Discord.RichEmbed()
            .setTitle(`Fila de ${msg.guild.name}`, ".")
            .setColor(config.botconfig.mainColor)
            .addField("Tocando agora", MusicHelper.createStringSongInfo(0, songPlaying));

        let allSongs = "";
        let songInlineInfo;
        let totalQueueLength = 0;

        // 1: 1 - 9
        // 2: 10 - 19

        let showPages = false;
        if (currentServer.queue.length > 10) {
            showPages = true;
        }

        let pageEnding = (showPages) ? page * 10 : currentServer.queue.length;
        let pageBegining = (showPages) ? pageEnding - 10 : 1;
        if (pageBegining == 0) pageBegining = 1;

        if (pageEnding > currentServer.queue.length) {
            pageEnding = currentServer.queue.length;
        }

        for (let i = pageBegining; i < pageEnding; i++) {
            let song = currentServer.queue[i];
            song.addedByUsername = (await msg.client.fetchUser(song.addedBy)).username;
            totalQueueLength += parseInt(song.info.length_seconds);
            
            songInlineInfo = MusicHelper.createStringSongInfo(i, song);
            if (i < currentServer.queue.length - 1) {
                songInlineInfo += "\n\n";
            }
            allSongs += songInlineInfo;
        }

        if (allSongs) {
            answer.addField("Próximas:", allSongs);
        }


        let pagesInfo = '';
        if (showPages) {
            let totalOfPages = Math.ceil(currentServer.queue.length / 10);
            pagesInfo = ` | Página: ${page}/${totalOfPages}`;
        }

        let footerMsg = (totalQueueLength > 0) ? `${currentServer.queue.length - 1} músicas na fila | Tempo total de fila: ${DateHelper.fmtMSS(totalQueueLength)}${pagesInfo}` : `${currentServer.queue.length - 1} músicas na fila.`;

        // answer.setFooter(`${currentServer.queue.length - 1} músicas na fila | Tempo total de fila: ${DateHelper.fmtMSS(totalQueueLength)}`);
        answer.setFooter(footerMsg);
        msg.channel.send(answer);
    }
}

module.exports = QueueCommand;
