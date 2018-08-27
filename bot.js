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
    });
}

setInterval(() => {
    updateBotActivity();
}, 600000);

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
    let answer = new Discord.RichEmbed()
        .setColor(0x99e6ff)
        .setTitle(`${member.user.username}. Seja bem vindo(a) ao servidor ${member.guild.name}.`)
        .addField("Regra 1", "The first rule of Fight Club is: You do not talk about Fight Club.", false)
        .addField("Regra 2", "The second rule of Fight Club is: You do not talk about Fight Club.");

    answer.setFooter("Se alguma das regras acima for quebrada não se surprenda com um ban.");

    member.send(answer);
    let memberRole = member.guild.roles.find("name", "Membro");
    member.addRole(memberRole).then().catch(console.error);
});

bot.login(config.token);
