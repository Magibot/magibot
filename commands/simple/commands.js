const Commando = require('discord.js-commando');

class Commands extends Commando.Command {
  constructor(client) {
    super(client, client.wrapper.commands.commands);
  }

  async run(message) {
    const reply = this.client.customEmbed.create();
    reply
      .setTitle('List of all bot commands')
      .addField('HELP', `\`${this.client.config.env.discord.prefix} help <command name>\` => Show how you can use an especific bot command`);

    const groups = Commands.separateCommandsInGroups(this.client.wrapper.commands);
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
        if (command.isWrapper) {
          Object.keys(command.subCommands).sort().forEach((subCommandName) => {
            const subCommand = command.subCommands[subCommandName];
            message.push(`\`${subCommand.usage}\` => ${subCommand.description}`);
          });

          return;
        }

        message.push(`\`${command.usage}\` => ${command.description}`);
      });

    return message.join('\n');
  }
}

module.exports = Commands;
