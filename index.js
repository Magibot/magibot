const path = require('path');
const Commando = require('discord.js-commando');

const config = require('./config/bot');
const wrapper = require('./wrapper');
const logger = require('./utils/logger');
const Radio = require('./utils/radio');
const embed = require('./utils/embed');

const handleGuildCreate = require('./events/guildCreate');
const handleGuildDelete = require('./events/guildDelete');

const bot = new Commando.Client({
  commandPrefix: config.env.discord.prefix,
  unknownCommandResponse: false,
  disableEveryone: true,
  disabledEvents: config.disabledEvents,
  messageCacheLifetime: config.env.discord.message.cacheLifetime,
  messageSweepInterval: config.env.discord.message.sweepInterval,
  messageCacheMaxSize: config.env.discord.message.cacheMaxSize,
  retryLimit: config.env.discord.retryLimit,
});

bot.services = {};
bot.services.swapi = require('./services/swapi.service');

bot.services.magi = {
  guild: require('./services/guild.service'),
};

bot.config = config;
bot.wrapper = wrapper;
bot.logger = logger;
bot.customEmbed = embed;
bot.Radio = new Radio();

bot.registry
  .registerDefaultTypes()
  .registerGroups([
    ['simple', 'Simple'],
    ['utils', 'Utilities'],
    ['radio', 'Radio'],
    ['voice', 'Voice'],
    ['swapi', 'Star Wars API'],
    ['help', 'Help'],
  ])
  .registerCommandsIn(path.join(__dirname, 'commands'));

bot.once('ready', async () => {
  bot.logger.success(`${bot.user.username} starting`);
  const guilds = bot.guilds.size;
  const channels = bot.channels.size;
  const users = bot.users.size;
  bot.logger.success(
    `Connected to ${guilds} guilds, ${channels} channels and ${users} users`,
  );
  const activity = "Fo' shizzle my nizzle";
  bot.logger.success(`Activity set to: ${activity}`);
  bot.user.setActivity(activity);
});

bot.on('guildCreate', handleGuildCreate);
bot.on('guildDelete', handleGuildDelete);

// bot.on('guildMemberAdd')
// bot.on('guildMemberRemove')

// bot.on('disconnect');

bot.login(config.env.discord.token);
