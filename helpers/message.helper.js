const Discord = require('discord.js');

exports.guildMemberEmbedMessage = (member, footerText, color) => new Discord.RichEmbed()
  .setColor(color)
  .setFooter(footerText, member.client.user.avatarURL)
  .setAuthor(`${member.user.username} (${member.user.id})`, member.user.avatarURL)
  .setTimestamp(new Date());
