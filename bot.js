const Commando = require("discord.js-commando");
const Discord = require("discord.js");
const config = require("./config/config.js");
const server = require("./utils/server.js");
const dateHelper = require("./utils/helpers/dateGenerator");
const statusActivities = require("./utils/helpers/statusActivities.js");
const dbconn = require("./dbconn.js");

const bot = new Commando.Client();

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)];
}

global.servers = {};

function updateBotActivity(firstActivityChange=false) {
    statusActivities.activitiesList(dbconn).then(result => {
        let possibleActivities = [];
        let currentActivity;
        for (let i = 0; i < result.length; i++) {
            currentActivity = result[i];
            if (currentActivity.UTILIZADO == 0) {
                possibleActivities.push(currentActivity);
            }
        }

        if (possibleActivities.length === 0) {
            for (let i = 0; i < result.length; i++) {
                currentActivity = result[i];
                statusActivities.updateUsedActivity(dbconn, currentActivity.CODIGOATIV, 0);
            }
            updateBotActivity(firstActivityChange);
            return;
        }

        let activity = possibleActivities.randomElement();
        message = `Jogo alterado para ${activity.DESCRICAO}.`;
        if (firstActivityChange) {
            message = `Agora jogando ${activity.DESCRICAO}.`;
        }

        statusActivities.updateUsedActivity(dbconn, activity.CODIGOATIV, 1);

        console.log(message);
        bot.user.setActivity(activity.DESCRICAO);
    }).catch(err => {
        console.log("Não foi possível se conectar ao banco de dado");
        console.log(`Motivo: ${err}`);
    });
}

setInterval(() => {
    updateBotActivity();
}, 600000);

function guildMemberEmbed(member, footerText, color) {
    return new Discord.RichEmbed()
        .setColor(color)
        .setFooter(footerText, icon=member.client.user.avatarURL)
        .setAuthor(`${member.user.username} (${member.user.id})`, icon=member.user.avatarURL)
        .setTimestamp(new Date());
}

bot.registry.registerGroup("simple", "Simple");
bot.registry.registerGroup("music", "Music");
bot.registry.registerGroup("transparency", "Transparency");
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.on("ready", () => {
    console.log(`${bot.user.username} startando.`);
    server.start(config.port);
    console.log(`Aberto na porta ${config.port}.`);
    console.log(`Conectado ao Banco de Dados: ${config.database.db}@${config.database.host}`);
    console.log(`Startado em ${bot.guilds.size} servidor, com total de ${bot.channels.size} canais e ${bot.users.size} membros.`);
    updateBotActivity(firstActivityChange=true);
});

bot.on("guildCreate", guild => {
    console.log(`Bot foi iniciado no server: ${guild.name} (${guild.id}). Esse server tem ${guild.memberCount} membros.`);
    updateBotActivity();
});

bot.on("guildDelete", guild => {
    console.log(`Bot foi removido do server: ${guild.name} (${guild.id}).`);
    updateBotActivity();
});

bot.on("guildMemberAdd", member => {
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

    let newMemberLog = guildMemberEmbed(member, "Novo membro", config.botconfig.memberAddColor);
    member.guild.channels.find("name", config.botconfig.mainChannel).send(newMemberLog);
});

bot.on("guildMemberRemove", member => {
    let removeMemberLog = guildMemberEmbed(member, "Membro saiu", config.botconfig.memberRemoveColor);
    member.guild.channels.find("name", config.botconfig.mainChannel).send(removeMemberLog);
});

bot.login(config.token);
