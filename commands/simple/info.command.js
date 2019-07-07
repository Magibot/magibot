/* eslint-disable class-methods-use-this */
const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const config = require('../../config');

class InfoCommand extends Commando.Command {
  constructor(client) {
    const commandProps = {
      name: 'info',
      group: 'simple',
      memberName: 'info',
      description: 'Shows info about the bot.',
    };

    super(client, commandProps);

    this.commandProps = commandProps;
  }

  async run(msg) {
    const response = new Discord.RichEmbed()
      .addField('Name', config.name)
      .addField('Purpose', config.description)
      .setColor(config.messages.colors.main);

    return msg.channel.send(response);
  }
}

module.exports = InfoCommand;
