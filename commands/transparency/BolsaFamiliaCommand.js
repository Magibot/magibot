const Commando = require("discord.js-commando");
const Discord = require("discord.js");
const GovernInterfaceApi = require("../../utils/models/GovernInterfaceApi");
const HttpService = require("../../utils/services/HttpService");
const ibge = require("../../utils/helpers/ibge");
const dbconn = require("../../dbconn.js");


class BolsaFamiliaCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "bolsafamilia",
            group: "transparency",
            memberName: "bolsafamilia",
            description: "Descreve os valores gastos no programa Bolsa Familia de um municipio em um mês específico."
        });

        this.httpService = new HttpService();
        this.urlDataApi = "http://www.transparencia.gov.br/api-de-dados";
        this.bolsaFamiliaApi = new GovernInterfaceApi(this.urlDataApi, "/bolsa-familia-por-municipio", ["mesAno", "codigoIbge", "pagina"]);
        this.ibge = ibge;
        this.db = dbconn;
    }

    async run(msg, args) {
        let answer = new Discord.RichEmbed()
            .setTitle("Resultado da Pesquisa")
            .setColor(0x99e6ff);

        let arrayArgs = args.trim().split(/ +/g);
        if (arrayArgs.length <= 1) {
            answer.addField("Error", "Faltam parametros para pesquisa");
            answer.addField("Exemplo de pesquisa", "!bolsafamilia 201805 RioDeJaneiro");
            msg.channel.send(answer);
            return;
        }

        let searchObj = {
            mesAno: arrayArgs[0],
            nomeconcat: arrayArgs[1],
            codigoIbge: null,
            municipio: null,
        };

        this.ibge.municipios(dbconn).then(result => {
            let currentCity;
            for (let i = 0; i < result.length; i++) {
                currentCity = result[i];
                if (currentCity.NOMECONCAT == searchObj.nomeconcat) {
                    searchObj.municipio = currentCity.NOME;
                    searchObj.codigoIbge = currentCity.CODIGOIBGE;
                }
            }

            if (!searchObj.codigoIbge) {
                answer.addField("Error", "Cidade inválida ou não cadastrada no banco de dados.");
                answer.addField("Exemplo de pesquisa", "!bolsafamilia 201805 RioDeJaneiro");
                msg.channel.send(answer);
                return;
            }

            this.bolsaFamiliaApi.data = {
                mesAno: searchObj.mesAno,
                codigoIbge: searchObj.codigoIbge,
                pagina: 1
            };
    
            this.httpService.get(this.bolsaFamiliaApi.url).then(response => {
                let res = response[0];
                console.log(res);
                answer.addField("Data de Referência", res.dataReferencia);
                answer.addField("Município", `${res.municipio.nomeIBGE} (${res.municipio.codigoIBGE})`);
                answer.addField("Valor", res.valor);
                answer.addField("Quantidade de beneficiados", res.quantidadeBeneficiados);
                answer.addField("URL do Serviço", this.bolsaFamiliaApi.url);
                answer.setFooter("Este comando utiliza a API de Dados do Portal de Transparência do Governo Federal localizado na url: http://www.transparencia.gov.br");
                answer.setURL(this.bolsaFamiliaApi.url);
                // answer.setDescription(`Programa do Bolsa Família\nData de Referência: ${res.dataReferencia}.\nMunicípio: ${res.municipio.nomeIBGE}.\nValor: ${res.valor}.\nQuantidade de beneficiados: ${res.quantidadeBeneficiados}.\nURL do Serviço: ${this.bolsaFamiliaApi.url}`);
                msg.channel.send(answer);
            }).catch(err => {
                answer.addField("Error", "Não foi possível realizar a pesquisa na serviço de transparência do governo!");
                answer.addField("Razão", "Página fora do ar ou resultado incoerente com a pesquisa realizada.")
                msg.channel.send(answer);
            });
        });
    }
}

module.exports = BolsaFamiliaCommand;
