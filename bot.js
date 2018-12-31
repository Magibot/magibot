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
        ["transparency", "Transparency"],
        ["playlist", "Playlist"]
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, "src/commands"));

bot.on("ready", () => {
    console.log(`${bot.user.username} iniciando.`);
    server.start(process.env.PORT || 3000);
    console.log(`Aberto na porta ${process.env.PORT}.`);
    console.log(`Iniciado em ${bot.guilds.size} servidor, com total de ${bot.channels.size} canais e ${bot.users.size} membros.`);
    if (process.env.SET_FUN_ACTIVITIES == true || process.env.SET_FUN_ACTIVITIES == "true") {
        BotHelper.updateBotActivity(bot, true);
        setInterval(() => {
                BotHelper.updateBotActivity(bot);
        }, parseInt(process.env.CHANGE_ACTIVITY_TIME) || 600000);
    }
});

// Events
bot.on("guildCreate", EventHandler.onGuildCreate);
bot.on("guildDelete", EventHandler.onGuildDelete);
bot.on("guildMemberAdd", EventHandler.onGuildMemberAdd);
bot.on("guildMemberRemove", EventHandler.onGuildMemberRemove);

let token = process.env.TOKEN;
if (process.env.NODE_ENV == 'development') {
    token = process.env.TESTING_TOKEN;
}

bot.login(token);
