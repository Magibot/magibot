const Commando = require('discord.js-commando');
const env = require('../../config/env');
const magi = require('../../magi');
const embed = require('../../utils/embed');

class Commands extends Commando.Command {
  static options() {
    return {
      usage: `${env.client.prefix} commands`,
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

    commandsList.push(`\`${env.client.prefix} help <command name>\` => Show how you can use an especific bot command`);
    const reply = embed.create();
    reply
      .setTitle('List of all bot commands')
      .addField('Commands', commandsList.join('\n\n'));

    return message.channel.send(reply);
  }
}

module.exports = Commands;
