const Discord = require("discord.js");
const ActivityController = require("../common/controllers/ActivityController.js");

class BotCommon {

    static updateBotActivity(client, firstActivityChange=false) {
        if (!client || !client.user) {
            return;
        }

        ActivityController.getUnusedActivity()
            .then((activity) => {
                let message = `Jogo alterado para ${activity.descricao}.`;
                if (firstActivityChange) {
                    message = `Agora jogando ${activity.descricao}.`;
                }

                console.log(message);
                client.user.setActivity(activity.descricao);
            })
            .catch(error => console.log(error));
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
