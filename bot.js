require("dotenv").config();
require('./src/helpers/PrototypesFunctions.js').config();
const path = require("path");
const fs = require("fs");
const Commando = require("discord.js-commando");
const Discord = require("discord.js");
const server = require("./src/api/server.js");
const BotHelper = require("./src/bot/Helper.js");
const EventHandler = require("./src/bot/EventHandler.js");

global.config = JSON.parse(fs.readFileSync("config.json", "utf8"));
global.servers = new Object();

const bot = new Commando.Client({
    commandPrefix: process.env.PREFIX,
    unknownCommandResponse: false,
    disableEveryone: true
});

bot.registry
    .registerDefaultTypes()
    .registerGroups([
        ["simple", "Simple"],
        ["music", "Music"],
        ["transparency", "Transparency"]
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, "src/commands"));

if (process.env.NEED_UPDATE_ACTIVITY == true || process.env.NEED_UPDATE_ACTIVITY == "true") {
    setInterval(() => {
            BotHelper.updateBotActivity(bot);
    }, 600000);
}

bot.on("ready", () => {
    console.log(`${bot.user.username} startando.`);
    server.start(process.env.PORT);
    console.log(`Aberto na porta ${process.env.PORT}.`);
    console.log(`Iniciando em ${bot.guilds.size} servidor, com total de ${bot.channels.size} canais e ${bot.users.size} membros.`);
    BotHelper.updateBotActivity(bot, firstActivityChange=true);
});

// Events
bot.on("guildCreate", EventHandler.onGuildCreate);
bot.on("guildDelete", EventHandler.onGuildDelete);
bot.on("guildMemberAdd", EventHandler.onGuildMemberAdd);
bot.on("guildMemberRemove", EventHandler.onGuildMemberRemove);

bot.login(process.env.TOKEN);
