const Commando = require("discord.js-commando");
const GovernInterfaceApi = require("../../utils/models/GovernInterfaceApi");
const HttpService = require("../../utils/services/HttpService");
const ibge = require("../../utils/helpers/ibge");

class BolsaFamiliaCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "bolsafamilia",
            group: "simple",
            memberName: "bolsafamilia",
            description: "Descreve os valores gastos no programa Bolsa Familia de um municipio"
        });

        this.httpService = new HttpService();
        this.urlDataApi = "http://www.transparencia.gov.br/api-de-dados";
        this.bolsaFamiliaApi = new GovernInterfaceApi(this.urlDataApi, "/bolsa-familia-por-municipio", ["mesAno", "codigoIbge", "pagina"]);
        this.municipios = ibge.municipios;
    }

    async run(msg, args) {
        let arrayArgs = args.trim().split(/ +/g);
        if (arrayArgs.length <= 1) {
            msg.reply("Faltam parametros para pesquisa.\nExemplo de pesquisa: !bolsafamilia 201805 RioDeJaneiro");
            return;
        }

        this.bolsaFamiliaApi.data = {
            mesAno: arrayArgs[0],
            codigoIbge: this.municipios[arrayArgs[1]],
            pagina: 1
        };

        this.httpService.get(this.bolsaFamiliaApi.url).then(response => {
            let res = response[0];
            msg.channel.send(`Programa do Bolsa Família\nData de Referência: ${res.dataReferencia}.\nMunicípio: ${res.municipio.nomeIBGE}.\nValor: ${res.valor}.\nQuantidade de beneficiados: ${res.quantidadeBeneficiados}.\nURL do Serviço: ${this.bolsaFamiliaApi.url}`);
        }).catch(err => {
            msg.reply("Não foi possível realizar a pesquisa na serviço de transparência do governo!");
        });
    }
}

module.exports = BolsaFamiliaCommand;