const Commando = require("discord.js-commando");
const Discord = require("discord.js");
const GovernInterfaceApi = require("../../utils/models/GovernInterfaceApi");
const HttpService = require("../../utils/services/HttpService");
const ibge = require("../../utils/helpers/ibge");


class BolsaFamiliaCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "bolsafamilia",
            group: "transparency",
            memberName: "bolsafamilia",
            description: "Descreve os valores gastos no programa Bolsa Familia de um municipio"
        });

        this.httpService = new HttpService();
        this.urlDataApi = "http://www.transparencia.gov.br/api-de-dados";
        this.bolsaFamiliaApi = new GovernInterfaceApi(this.urlDataApi, "/bolsa-familia-por-municipio", ["mesAno", "codigoIbge", "pagina"]);
        this.municipios = ibge.municipios;
    }

    async run(msg, args) {
        let answer = new Discord.RichEmbed()
            .setTitle("Resultado da Pesquisa")
            .setColor(0x99e6ff)
            .setFooter("Este serviço utiliza a API de Dados do Portal de Transparência do Governo Federal localizado em: http://www.transparencia.gov.br");
        let arrayArgs = args.trim().split(/ +/g);
        if (arrayArgs.length <= 1) {
            answer.addField("Error", "Faltam parametros para pesquisa");
            answer.addField("Exemplo de pesquisa", "!bolsafamilia 201805 RioDeJaneiro");
            msg.channel.send(answer);
            return;
        }

        this.bolsaFamiliaApi.data = {
            mesAno: arrayArgs[0],
            codigoIbge: this.municipios[arrayArgs[1]],
            pagina: 1
        };

        this.httpService.get(this.bolsaFamiliaApi.url).then(response => {
            let res = response[0];
            answer.addField("Data de Referência", res.dataReferencia);
            answer.addField("Município", res.municipio.nomeIBGE);
            answer.addField("Valor", res.valor);
            answer.addField("Quantidade de beneficiados", res.quantidadeBeneficiados);
            answer.addField("URL do Serviço", this.bolsaFamiliaApi.url);
            // answer.setDescription(`Programa do Bolsa Família\nData de Referência: ${res.dataReferencia}.\nMunicípio: ${res.municipio.nomeIBGE}.\nValor: ${res.valor}.\nQuantidade de beneficiados: ${res.quantidadeBeneficiados}.\nURL do Serviço: ${this.bolsaFamiliaApi.url}`);
            msg.channel.send(answer);
        }).catch(err => {
            answer.addField("Error", "Não foi possível realizar a pesquisa na serviço de transparência do governo!");
            msg.channel.send(answer);
        });
    }
}

module.exports = BolsaFamiliaCommand;