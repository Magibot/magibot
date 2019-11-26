const path = require('path');
const Commando = require('discord.js-commando');
const env = require('./config/env');
const magi = require('./magi');
const logger = require('./utils/logger');
const Radio = require('./utils/radio');

const handleGuildCreate = require('./events/guildCreate');
const handleGuildDelete = require('./events/guildDelete');

const bot = new Commando.Client({
  commandPrefix: env.client.prefix,
  unknownCommandResponse: false,
  disableEveryone: true,
  disabledEvents: magi.client.disabledEvents,
  messageCacheLifetime: env.client.messageCacheLifetime,
  messageSweepInterval: env.client.messageSweepInterval,
  messageCacheMaxSize: env.client.messageCacheMaxSize,
  retryLimit: env.client.retryLimit,
});

bot.registry
  .registerDefaultTypes()
  .registerGroups([
    ['simple', 'Simple'],
    ['utils', 'Utilities'],
    ['radio', 'Radio'],
    ['voice', 'Voice'],
    ['swapi', 'Star Wars API'],
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

  global.Radio = new Radio();
});

bot.on('guildCreate', handleGuildCreate);
bot.on('guildDelete', handleGuildDelete);

// bot.on('guildMemberAdd')
// bot.on('guildMemberRemove')

// bot.on('disconnect');

bot.login(env.client.token);
