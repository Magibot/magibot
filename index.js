const path = require('path');
const Commando = require('discord.js-commando');
const env = require('./config/env');
const magi = require('./magi');
const logger = require('./utils/logger');

const handleGuildCreate = require('./events/guildCreate');
const handleGuildDelete = require('./events/guildDelete');

const bot = new Commando.Client({
  commandPrefix: env.clientCommandPrefix,
  unknownCommandResponse: false,
  disableEveryone: true,
  disabledEvents: magi.client.disabledEvents,
});

bot.registry
  .registerDefaultTypes()
  .registerGroups([
    ['simple', 'Simple'],
    ['utils', 'Utilities'],
  ])
  .registerCommandsIn(path.join(__dirname, 'commands'));

bot.once('ready', async () => {
  logger.success(`${bot.user.username} starting`);
  const guilds = bot.guilds.size;
  const channels = bot.channels.size;
  const users = bot.users.size;
  logger.success(
    `Connected to ${guilds} guilds, ${channels} channels and ${users} users`,
  );
  const activity = "Fo' shizzle my nizzle";
  logger.success(`Activity set to: ${activity}`);
  bot.user.setActivity(activity);
});

bot.on('guildCreate', handleGuildCreate);
bot.on('guildDelete', handleGuildDelete);

// bot.on('guildMemberAdd')
// bot.on('guildMemberRemove')


// bot.on('disconnect');

bot.login(env.token);
