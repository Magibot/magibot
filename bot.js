const Discord = require("discord.js");
const config = require("./config.js");
const server = require("./utils/server.js");
const HttpService = require("./utils/services/HttpService");
const GovernInterfaceApi = require("./utils/models/GovernInterfaceApi");
const dateHelper = require("./utils/helpers/dateGenerator");
const municipios = require("./utils/helpers/municipiosIBGE");
const statusActivities = require("./utils/statusActivities.js");

const Bot = new Discord.Client();
const httpService = new HttpService();

const urlDataApi = "http://www.transparencia.gov.br/api-de-dados";
const bolsaFamiliaApi = new GovernInterfaceApi(urlDataApi, "/bolsa-familia-por-municipio", ["mesAno", "codigoIbge", "pagina"]);

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)];
}

const commands = ["ping", "bolsafamilia", "purge"];

function updateBotActivity(firstActivityChange=false) {
    let jogo = statusActivities.randomElement();
    message = `Jogo alterado para ${jogo}.`;
    if (firstActivityChange) {
        message = `Agora jogando ${jogo}.`;
    }
    
    console.log(message);
    Bot.user.setActivity(jogo);
}

setInterval(function(){ updateBotActivity(firstActivityChange=false); }, 600000);

Bot.on("ready", () => {
    console.log(`${Bot.user.username} startando.`);
    server.start(3030);
    console.log(`Aberto na porta ${3030}.`);
    console.log(`Startado em ${Bot.guilds.size} servidor, com total de ${Bot.channels.size} canais e ${Bot.users.size} membros.`);
    updateBotActivity(firstActivityChange=true);
});

Bot.on("guildCreate", guild => {
    console.log(`Bot foi iniciado no server: ${guild.name} (${guild.id}). Esse server tem ${guild.memberCount} membros.`);
    updateBotActivity();
});

Bot.on("guildDelete", guild => {
    console.log(`Bot foi removido do server: ${guild.name} (${guild.id}).`);
    updateBotActivity();
});

Bot.on("message", async msg => {
    if (msg.author.bot) return;

    if (msg.content.indexOf(config.prefix) !== 0) return;

    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (commands.indexOf(cmd) < 0) return;

    if (cmd === "bolsafamilia") {
        if (args.length <= 1) {
            msg.reply("Faltam paramentros para pesquisa.\nExemplo de Pesquisa: !bolsafamilia 201805 RioDeJaneiro");
            return
        }

        bolsaFamiliaApi.data = {
            mesAno: args[0],
            codigoIbge: municipios[args[1]],
            pagina: 1
        }
    
        httpService.get(bolsaFamiliaApi.url).then(response => {
            let res = response[0];
            msg.channel.send(`Programa do Bolsa Família\nData de Referência: ${res.dataReferencia}.\nMunicípio: ${res.municipio.nomeIBGE}.\nValor: ${res.valor}.\nQuantidade de beneficiados: ${res.quantidadeBeneficiados}.\nURL do Serviço: ${bolsaFamiliaApi.url}`);
        }).catch(err => {
            msg.reply("Não foi possível realizar a pesquisa na serviço de transparência do governo!");
        });
    }

    if (cmd === "ping") {
        let m = await msg.channel.send("Ping?");
        m.edit(`Pong! Latencia de ${m.createdTimestamp - msg.createdTimestamp}ms. Latencia da API de ${Math.round(Bot.ping)}ms`);
    }
});

Bot.login(config.token);
