const Discord = require('discord.js');
const env = require('../config/env');

const create = () => (
  new Discord.RichEmbed()
    .setColor('#0099ff')
    // .setURL('https://discord.js.org/')
    // .setAuthor('Magi', env.client.picture, env.client.website)
    .setTimestamp()
    .setFooter('Magi', env.client.picture)
);

module.exports = {
  create,
};
