const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const TransparencyApi = require('../../services/transparency.api');
const City = require('../../models/city.model');
const config = require('../../config');
const { getUrlWithQueryParams } = require('../../helpers/api.helper');

class BolsaFamiliaCommand extends Commando.Command {
  constructor(client) {
    const commandProps = {
      name: 'bolsafamilia',
      group: 'transparency',
      memberName: 'bolsafamilia',
      description:
        'Shows the amounts spent in the Brazilian govern program, Bolsa Familia, of a city in a specific month.',
    };

    super(client, commandProps);

    this.commandProps = commandProps;

    this.example = `${config.app.prefix} ${commandProps.name} 201805 RioDeJaneiro`;
  }

  async run(msg, args) {
    const response = new Discord.RichEmbed()
      .setTitle('Search result')
      .setColor(config.messages.colors.main);

    const messageArgs = BolsaFamiliaCommand.parseMessageArguments(args);
    if (messageArgs.error) {
      response.addField('Error', messageArgs.error);
      response.addField('Search example', this.example);
      return msg.channel.send(response);
    }

    const city = await City.find({ idName: messageArgs.idName });
    if (!city) {
      response.addField('Error', 'City not found');
      response.addField('Search example', this.example);
      return msg.channel.send(response);
    }

    try {
      const { data, serviceUrl } = await BolsaFamiliaCommand.getTransparencyApiData(
        messageArgs.monthYear,
        city.ibgeCode,
      );

      const {
        dataReferencia, municipio, quantidadeBeneficiados, valor,
      } = data;

      response.addField('Reference date', dataReferencia);
      response.addField('City', `${municipio.nomeIBGE} (${municipio.codigoIbge})`);
      response.addField('Value', valor);
      response.addField('Beneficiaries', quantidadeBeneficiados);
      response.addField('Service URL', serviceUrl);

      response.setFooter('This command consumes the API from the Brazilian Federal Government');

      response.setURL(config.services.api.transparency.baseUrl);
      return msg.channel.send(response);
    } catch (err) {
      response.addField('Error', 'Could not get data from transparency API.');
      return msg.channel.send(response);
    }
  }

  static parseMessageArguments(args) {
    const arrayArgs = args.trim().split(/ +/g);
    if (arrayArgs.length < 2) {
      return { error: 'Missing search parameters' };
    }

    return { monthYear: arrayArgs[0], idName: arrayArgs[1] };
  }

  static async getTransparencyApiData(monthYear, ibgeCode) {
    const { baseUrl, bolsaFamiliaByCityEndpoint } = config.services.api.transparency;

    const params = {
      mesAno: monthYear,
      codigoIbge: ibgeCode,
      pagina: 1,
    };

    const response = await TransparencyApi.get(bolsaFamiliaByCityEndpoint, { params });

    const serviceUrl = getUrlWithQueryParams(`${baseUrl}${bolsaFamiliaByCityEndpoint}`, params);
    return { data: response.data, serviceUrl };
  }
}

module.exports = BolsaFamiliaCommand;
