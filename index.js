const env = require('./config/env');
const Commando = require('discord.js-commando');
const logger = require('./app/logger');

const handleGuildCreate = require('./events/guildCreate');
const handleGuildDelete = require('./events/guildDelete');

global.GuildIdMap = new Map();

const bot = new Commando.Client({
  commandPrefix: '!magi',
  unknownCommandResponse: false,
  disableEveryone: true
});

bot.on('ready', async () => {
  logger.success(`${bot.user.username} starting`);
  const guilds = bot.guilds.size;
  const channels = bot.channels.size;
  const users = bot.users.size;
  logger.success(
    `Connected to ${guilds} guilds, ${channels} channels and ${users} users`
  );
  const activity = "Fo' shizzle my nizzle";
  logger.success(`Activity set to: ${activity}`);
  bot.user.setActivity(activity);
});

bot.on('guildCreate', handleGuildCreate);
bot.on('guildDelete', handleGuildDelete);

// bot.on('disconnect');

bot.login(env.token);
