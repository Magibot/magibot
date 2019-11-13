const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const env = require('../../config/env');
const magi = require('../../magi');

class Help extends Commando.Command {
  static options() {
    return {
      name: 'help',
      group: 'simple',
      memberName: 'help',
      description: 'Describe the usage of a command',
      details: 'Should receive one argument referring to the command you want to know about',
      examples: [
        `${env.client.prefix} help purge`,
        `${env.client.prefix} help play`,
      ],
      args: [
        {
          key: 'commandName',
          prompt: '',
          type: 'string',
          label: 'command name',
        },
      ],
    };
  }

  constructor(client) {
    super(client, Help.options());
  }

  async run(message, { commandName }) {
    const command = magi.commands[commandName];
    if (!command) {
      return message.reply(`This command does not exist. Use "${env.client.prefix} commands" to know all commands`);
    }

    const embed = new Discord.RichEmbed()
      .setColor('#0099ff')
      .setTitle(`The "${command.name}" command`)
      // .setURL('https://discord.js.org/')
      // .setAuthor('Magi', env.client.picture, env.client.website)
      .setDescription(command.usage)
      .addField('Description', command.description, true)
      .addField('Details', command.details, true)
      .setTimestamp()
      .setFooter('Magi', env.client.picture);

    if (command.args && command.args.length > 0) {
      let argsFieldValue = '';
      for (let i = 0; i < command.args.length; i += 1) {
        argsFieldValue += `${i + 1}: <${command.args[i].label}> ${command.args[i].prompt}\n`;
      }

      embed.addField('Arguments', argsFieldValue);
    }

    if (command.examples && command.examples.length > 0) {
      let examplesFieldValues = '';
      for (let i = 0; i < command.examples.length; i += 1) {
        examplesFieldValues += `${command.examples[i]}\n`;
      }

      embed.addField('Examples', examplesFieldValues);
    }

    let permissionsFieldValue = '';
    if (command.userPermissions && command.userPermissions.length > 0) {
      for (let i = 0; i < command.userPermissions.length; i += 1) {
        permissionsFieldValue += `${command.userPermissions[i]}\n`;
      }
    } else {
      permissionsFieldValue = 'All members can use this command';
    }
    embed.addField('Permissions', permissionsFieldValue, true);

    if (command.guildOnly) {
      embed.addField('Can be used in DM?', 'No', true);
    } else {
      embed.addField('Can be used in DM?', 'Yes', true);
    }

    if (command.throttling) {
      const { usages, duration } = command.throttling;
      embed.addField('Use limit', `This command can only be used ${usages} times in ${duration} seconds`, true);
    }

    return message.channel.send(embed);
  }
}

module.exports = Help;
