const Discord = require("discord.js");
const BotHelper = require("./Helper.js");

class EventHandler {

    static onGuildCreate(guild) {
        console.log(`Bot foi iniciado no server: ${guild.name} (${guild.id}). Esse servidor tem ${guild.memberCount} membros.`);
    }

    static onGuildDelete(guild) {
        console.log(`Bot foi removido do servidor: ${guild.name} (${guild.id}).`);
    }

    static onGuildMemberAdd(member) {
        let welcomeEmbedDM = new Discord.RichEmbed()
            .setColor(config.botconfig.memberAddColor)
            .setTitle(`${member.user.username}. Seja bem vindo(a) ao servidor ${member.guild.name}.`)
            .addField("Regra 1", "The first rule of Fight Club is: You do not talk about Fight Club.", false)
            .addField("Regra 2", "The second rule of Fight Club is: You do not talk about Fight Club.")
            .setFooter(`© ${member.client.user.username}`, icon=member.client.user.avatarURL)
            .setTimestamp(new Date());

        member.send(welcomeEmbedDM);

        let memberRole = member.guild.roles.find("name", config.botconfig.initRole);
        member.addRole(memberRole).then().catch(console.error);

        let newMemberLog = BotHelper.createGuildMemberEmbed(member, "Novo membro", config.botconfig.memberAddColor);
        member.guild.channels.find("name", config.botconfig.mainChannel).send(newMemberLog);
    }

    static onGuildMemberRemove(member) {
        let removeMemberLog = BotHelper.createGuildMemberEmbed(member, "Membro saiu", config.botconfig.memberRemoveColor);
        member.guild.channels.find("name", config.botconfig.mainChannel).send(removeMemberLog);
    }
}

module.exports = EventHandler;
