const Commando = require("discord.js-commando");
const config = require("./config.js");
const server = require("./utils/server.js");
const dateHelper = require("./utils/helpers/dateGenerator");
const statusActivities = require("./utils/statusActivities.js");

const bot = new Commando.Client();

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)];
}

function updateBotActivity(firstActivityChange=false) {
    let jogo = statusActivities.randomElement();
    message = `Jogo alterado para ${jogo}.`;
    if (firstActivityChange) {
        message = `Agora jogando ${jogo}.`;
    }
    
    console.log(message);
    bot.user.setActivity(jogo);
}

setInterval(() => {
    updateBotActivity();
}, 600000);

bot.registry.registerGroup("simple", "Simple");
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.on("ready", () => {
    console.log(`${bot.user.username} startando.`);
    server.start(3030);
    console.log(`Aberto na porta ${3030}.`);
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
