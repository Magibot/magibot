const path = require('path');
const Commando = require('discord.js-commando');

const setupEvents = require('./events');

const config = require('./config');

const bot = new Commando.Client({
  commandPrefix: config.app.prefix,
  unknownCommandResponse: false,
  disableEveryone: true,
});

bot.registry
  .registerDefaultTypes()
  .registerGroups([
    ['simple', 'Simple'],
    ['music', 'Music'],
    ['transparency', 'Transparency'],
    ['playlist', 'Playlist'],
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'src/commands'));

setupEvents(bot);

bot.login(config.app.token);
