require("dotenv").config();
const path = require("path");
const fs = require("fs");
const Commando = require("discord.js-commando");
const Discord = require("discord.js");
const mysql = require("mysql");
const server = require("./utils/server.js");
const DateHelper = require("./utils/helpers/DateHelper.js");
const SearchDocument = require("./common/SearchDocument.js");
const Finder = require("./common/Finder.js");

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

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)];
}

String.prototype.toCamelCase = function() {
    let string = this.toLowerCase().replace(/(?:(^.)|([-_\s]+.))/g, function(match) {
        return match.charAt(match.length-1).toUpperCase();
    });
    return string.charAt(0).toLowerCase() + string.substring(1);
}

Object.prototype.zip = function (arr1, arr2) {
    let obj = {};
    for (let i = 0; i < arr1.length; i++) {
        obj[arr1[i]] = arr2[i];
    }
    return obj;
}

Object.prototype.exists = function () {
    return Object.keys(this).length > 0;
}

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


function updateBotActivity(firstActivityChange=false) {
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
            updateBotActivity(firstActivityChange);
            return;
        }

        let activity = possibleActivities.randomElement();
        message = `Jogo alterado para ${activity.descricao}.`;
        if (firstActivityChange) {
            message = `Agora jogando ${activity.descricao}.`;
        }

        searchDoc.clear();
        searchDoc.changes.utilizado = 1;
        searchDoc.parameters.codigoAtiv = activity.codigoAtiv;
        Finder.save(dbconn, searchDoc);

        console.log(message);
        bot.user.setActivity(activity.descricao);
    }).catch(err => {
        console.log("Não foi possível se conectar ao banco de dados");
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

bot.on("ready", () => {
    console.log(`${bot.user.username} startando.`);
    server.start(process.env.PORT);
    console.log(`Aberto na porta ${process.env.PORT}.`);
    console.log(`Conectado ao Banco de Dados: ${process.env.DB_NAME}@${process.env.DB_HOST}`);
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

bot.login(process.env.TOKEN);
