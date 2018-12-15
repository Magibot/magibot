require("dotenv").config();
require('./utils/PrototypesFunctions.js').config();
const path = require("path");
const fs = require("fs");
const Commando = require("discord.js-commando");
const Discord = require("discord.js");
const mysql = require("mysql");
const server = require("./utils/server.js");
const BotCommon = require("./common/BotCommon.js");

global.config = JSON.parse(fs.readFileSync("config.json", "utf8"));
global.dbconn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
global.servers = {};

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
    .registerCommandsIn(path.join(__dirname, "commands"));


setInterval(() => {
    BotCommon.updateBotActivity(bot);
}, 600000);

bot.on("ready", () => {
    console.log(`${bot.user.username} startando.`);
    server.start(process.env.PORT);
    console.log(`Aberto na porta ${process.env.PORT}.`);
    console.log(`Conectado ao Banco de Dados: ${process.env.DB_NAME}@${process.env.DB_HOST}`);
    console.log(`Startado em ${bot.guilds.size} servidor, com total de ${bot.channels.size} canais e ${bot.users.size} membros.`);
    BotCommon.updateBotActivity(bot, firstActivityChange=true);
});

bot.on("guildCreate", guild => {
    console.log(`Bot foi iniciado no server: ${guild.name} (${guild.id}). Esse server tem ${guild.memberCount} membros.`);
    BotCommon.updateBotActivity(bot);
});

bot.on("guildDelete", guild => {
    console.log(`Bot foi removido do server: ${guild.name} (${guild.id}).`);
    BotCommon.updateBotActivity(bot);
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

    let newMemberLog = BotCommon.createGuildMemberEmbed(member, "Novo membro", config.botconfig.memberAddColor);
    member.guild.channels.find("name", config.botconfig.mainChannel).send(newMemberLog);
});

bot.on("guildMemberRemove", member => {
    let removeMemberLog = BotCommon.createGuildMemberEmbed(member, "Membro saiu", config.botconfig.memberRemoveColor);
    member.guild.channels.find("name", config.botconfig.mainChannel).send(removeMemberLog);
});

bot.login(process.env.TOKEN);
