const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const DateHelper = require("../../helpers/DateHelper.js");
const MusicHelper = require("../../helpers/MusicHelper.js");

class RemoveCommand extends Commando.Command {

    constructor(client) {
        super(client, {
            name: "remove",
            group: "music",
            memberName: "remove",
            description: "Remove a música de índice informado da fila."
        });
    }

    async run(msg, args) {
        const currentServer = global.servers[msg.guild.id];

        if (!currentServer || currentServer.queue.length == 0) {
            return msg.channel.send(`Não existe músicas na fila para este servidor.`);
        }

        let arrayArgs = args.trim().split(/ +/g);

        let songToRemoveIndex = (arrayArgs[0] && !isNaN(arrayArgs[0])) ? parseInt(arrayArgs[0]) : null;

        let errorMessage = new Discord.RichEmbed();
        if (!songToRemoveIndex) {
            errorMessage
                .setTitle("Parametro do comando inválido.")
                .addField("Exemplo:", `\`${process.env.PREFIX}remove <indice-da-musica-na-fila>\`.`)
                .addField('O indice deve estar entre:', `\`0\` e \`${currentServer.queue.length}\` (não inclusos)`);
            return msg.channel.send(errorMessage);
        }

        if (songToRemoveIndex == 0) {
            errorMessage
                .setTitle("Não foi possível remover a música que está tocando da fila.")
                .addField("Dica:", `**Utilize o comando skip:** \`${process.env.PREFIX}skip\` para pular a música que está tocando.`);
            return msg.channel.send(errorMessage);
        }

        if (songToRemoveIndex >= currentServer.queue.length) {
            errorMessage
                .setTitle('Não existe música com este índice.')
                .addField('O indice deve estar entre:', `\`0\` e \`${currentServer.queue.length}\` (não inclusos)`);
            return msg.channel.send(errorMessage);
        }

        let songToRemove = currentServer.queue[songToRemoveIndex];
        currentServer.queue.splice(songToRemoveIndex, 1);
        
        let answer = new Discord.RichEmbed()
            .setColor(config.botconfig.mainColor)
            .setTitle('Música removida com sucesso da fila')
            .addField('Título:', `\`${songToRemove.info.title}\``)
            .addField('Adicionada a fila por:', `\`${(await msg.client.fetchUser(songToRemove.addedBy)).username}\``)
            .addField('Quantidade de músicas na fila agora:', `\`${currentServer.queue.length - 1}\``)
            .addField('Tempo de fila agora:', `\`${DateHelper.fmtMSS(MusicHelper.getQueueLength(currentServer.queue))}\``);

        msg.channel.send(answer);
    }
}

module.exports = RemoveCommand;
