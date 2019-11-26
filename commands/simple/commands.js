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
    const reply = embed.create();
    reply
      .setTitle('List of all bot commands')
      .addField('HELP', `\`${env.client.prefix} help <command name>\` => Show how you can use an especific bot command`);

    const groups = Commands.separateCommandsInGroups(magi.commands);
    Object.keys(groups).sort().forEach((group) => {
      const groupMessage = Commands.createCommandsGroupMessage(groups[group]);
      reply.addField(group.toUpperCase(), groupMessage);
    });

    return message.channel.send(reply);
  }

  static separateCommandsInGroups(commands) {
    const groups = {};
    Object.keys(commands).forEach((name) => {
      const options = commands[name];
      const { group } = options;
      if (!groups[group]) {
        groups[group] = [];
      }

      groups[group].push(options);
    });

    return groups;
  }

  static createCommandsGroupMessage(group) {
    const message = [];

    group
      .sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }

        return 0;
      })
      .forEach((command) => {
        message.push(`\`${command.usage}\` => ${command.description}`);
      });

    return message.join('\n');
  }
}

module.exports = Commands;
