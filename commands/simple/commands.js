const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const env = require('../../config/env');
const magi = require('../../magi');
const Help = require('./help');

class Commands extends Commando.Command {
  static options() {
    return {
      name: 'commands',
      group: 'simple',
      memberName: 'commands',
      description: 'Shows a list of all commands that the bot can do',
      details: 'Only for noobs',
      examples: [
        `${env.client.prefix} commands`,
      ],
    };
  }

  constructor(client) {
    super(client, Commands.options());
  }

  async run(message) {
    const commandsList = [];
    Object.keys(magi.commands).forEach((cmdName) => {
      commandsList.push(`\`${magi.commands[cmdName].usage}\` => ${magi.commands[cmdName].description}`);
    });

    const embed = new Discord.RichEmbed()
      .setColor('#0099ff')
      .setTitle('List of all bot commands')
      // .setURL('https://discord.js.org/')
      // .setAuthor('Magi', env.client.picture, env.client.website)
      .setTimestamp()
      .setFooter('Magi', env.client.picture);

    const help = Help.options();
    commandsList.push(`\`${help.usage}\` => ${help.description}`);

    embed.addField('Commands', commandsList.join('\n\n'));
    return message.channel.send(embed);
  }
}

module.exports = Commands;
