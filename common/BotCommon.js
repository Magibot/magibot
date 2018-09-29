const SearchDocument = require("./SearchDocument.js");
const Finder = require("./Finder.js");
const Discord = require("discord.js");

class BotCommon {

    static updateBotActivity(client, firstActivityChange=false) {
        let searchDoc = new SearchDocument("STATUSATIVIDADE");
        Finder.runSearch(dbconn, searchDoc).then(result => {
            let possibleActivities = [];
            let currentActivity;
            for (let i = 0; i < result.length; i++) {
                currentActivity = result[i];
                if (currentActivity.utilizado == 0) {
                    possibleActivities.push(currentActivity);
                }
            }
    
            if (possibleActivities.length === 0) {
                searchDoc.clear();
                searchDoc.changes.utilizado = 0;
                Finder.save(dbconn, searchDoc);
                BotCommon.updateBotActivity(firstActivityChange);
                return;
            }
    
            let activity = possibleActivities.randomElement();
            let message = `Jogo alterado para ${activity.descricao}.`;
            if (firstActivityChange) {
                message = `Agora jogando ${activity.descricao}.`;
            }
    
            searchDoc.clear();
            searchDoc.changes.utilizado = 1;
            searchDoc.parameters.codigoAtiv = activity.codigoAtiv;
            Finder.save(dbconn, searchDoc);
    
            console.log(message);
            client.user.setActivity(activity.descricao);
        }).catch(err => {
            console.log("Não foi possível se conectar ao banco de dados");
            console.log(`Motivo: ${err}`);
        });
    }

    static createGuildMemberEmbed(member, footerText, color) {
        return new Discord.RichEmbed()
            .setColor(color)
            .setFooter(footerText, icon=member.client.user.avatarURL)
            .setAuthor(`${member.user.username} (${member.user.id})`, icon=member.user.avatarURL)
            .setTimestamp(new Date());
    }
}

module.exports = BotCommon;
