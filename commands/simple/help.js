const Commando = require('discord.js-commando');

class Help extends Commando.Command {
  constructor(client) {
    super(client, client.wrapper.commands.help);
  }

  async run(message, { commandName }) {
    const command = this.client.wrapper.commands[commandName];
    if (!command) {
      return message.reply(`This command does not exist. Use "${this.client.config.env.discord.prefix} commands" to know all commands`);
    }

    const reply = this.client.customEmbed.create();

    reply
      .setTitle(`The "${command.name}" command`)
      .setDescription(command.usage)
      .addField('Description', command.description, true)
      .addField('Details', command.details, true);

    if (command.args && command.args.length > 0) {
      let argsFieldValue = '';
      for (let i = 0; i < command.args.length; i += 1) {
        argsFieldValue += `${i + 1}: <${command.args[i].label}> ${command.args[i].prompt}\n`;
      }

      reply.addField('Arguments', argsFieldValue);
    }

    if (command.examples && command.examples.length > 0) {
      let examplesFieldValues = '';
      for (let i = 0; i < command.examples.length; i += 1) {
        examplesFieldValues += `${command.examples[i]}\n`;
      }

      reply.addField('Examples', examplesFieldValues);
    }

    let permissionsFieldValue = '';
    if (command.userPermissions && command.userPermissions.length > 0) {
      for (let i = 0; i < command.userPermissions.length; i += 1) {
        permissionsFieldValue += `${command.userPermissions[i]}\n`;
      }
    } else {
      permissionsFieldValue = 'All members can use this command';
    }
    reply.addField('Permissions', permissionsFieldValue, true);

    if (command.guildOnly) {
      reply.addField('Can be used in DM?', 'No', true);
    } else {
      reply.addField('Can be used in DM?', 'Yes', true);
    }

    if (command.throttling) {
      const { usages, duration } = command.throttling;
      reply.addField('Use limit', `This command can only be used ${usages} times in ${duration} seconds`, true);
    }

    return message.channel.send(reply);
  }
}

module.exports = Help;
