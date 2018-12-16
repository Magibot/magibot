const Commando = require("discord.js-commando");
const Discord = require("discord.js");
const GovernInterfaceApi = require("../../utils/models/GovernInterfaceApi");
const HttpService = require("../../utils/services/HttpService");
const MunicipioIbgeController = require("../../common/controllers/MunicipioIbgeController.js");

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
    }

    async run(msg, args) {
        let answer = new Discord.RichEmbed()
            .setTitle("Resultado da Pesquisa")
            .setColor(config.botconfig.mainColor);

        let arrayArgs = args.trim().split(/ +/g);
        if (arrayArgs.length <= 1) {
            answer.addField("Error", "Faltam parametros para pesquisa");
            answer.addField("Exemplo de pesquisa", "!bolsafamilia 201805 RioDeJaneiro");
            msg.channel.send(answer);
            return;
        }

        let cmdParameters = {
            mesAno: arrayArgs[0],
            nomeConcat: arrayArgs[1],
            codigoIbge: null,
            municipio: null,
        };
        
        MunicipioIbgeController.getMunicipioByConcatName(cmdParameters.nomeConcat)
            .then((municipio) => {
                if (!municipio) {
                    answer.addField("Error", "Cidade inválida ou não cadastrada no banco de dados.");
                    answer.addField("Exemplo de pesquisa", "!bolsafamilia 201805 RioDeJaneiro");
                    return msg.channel.send(answer);
                }

                cmdParameters.municipio = municipio.nome;
                cmdParameters.codigoIbge = municipio.codigoIbge;
                this.bolsaFamiliaApi.data = {
                    mesAno: cmdParameters.mesAno,
                    codigoIbge: cmdParameters.codigoIbge,
                    pagina: 1
                };

                this.httpService.get(this.bolsaFamiliaApi.url).then(response => {
                    let res = response[0];
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
            })
            .catch(error => console.log(error));
    }
}

module.exports = BolsaFamiliaCommand;
