const Discord = require('discord.js');
const config = require('../../config/bot');

const create = () => (
  new Discord.RichEmbed()
    .setColor('#0099ff')
    // .setURL('https://discord.js.org/')
    // .setAuthor('Magi', env.client.picture, env.client.website)
    .setTimestamp()
    .setFooter('ELIS', config.env.discord.picture)
);

module.exports = {
  create,
};
