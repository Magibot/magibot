const Commando = require("discord.js-commando");
const config = require("./config/config.js");
const server = require("./utils/server.js");
const dateHelper = require("./utils/helpers/dateGenerator");
const statusActivities = require("./utils/statusActivities.js");
const mysql = require("mysql");

const dbconn = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.db
});

const bot = new Commando.Client();

const port = 3030;

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
    server.start(port);
    console.log(`Aberto na porta ${port}.`);
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

bot.login(config.token);
