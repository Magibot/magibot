const path = require('path');
const Commando = require('discord.js-commando');
const Keyv = require('keyv');

const nlp = require('../services/nlp');
const config = require('./bot');
const wrapper = require('../wrapper');
const logger = require('../utils/logger');
const Radio = require('../utils/radio');
const embed = require('../utils/embed');
const helpers = require('../helpers');

const guildEventHandler = require('../events/guild');

const swapiService = require('../services/swapi.service');
const guildService = require('../services/guild.service');


const createClient = () => {
  const client = new Commando.Client({
    commandPrefix: config.env.discord.prefix,
    unknownCommandResponse: false,
    disableEveryone: true,
    disabledEvents: config.disabledEvents,
    messageCacheLifetime: config.env.discord.message.cacheLifetime,
    messageSweepInterval: config.env.discord.message.sweepInterval,
    messageCacheMaxSize: config.env.discord.message.cacheMaxSize,
    retryLimit: config.env.discord.retryLimit,
  });

  client.database = {
    guilds: new Keyv('sqlite://db.sqlite', { namespace: 'guilds' }),
  };

  client.nlp = nlp;
  client.services = {
    swapi: swapiService,
    magi: {
      guild: guildService,
    },
  };

  client.config = config;
  client.wrapper = wrapper;
  client.logger = logger;
  client.customEmbed = embed;
  client.helpers = helpers;
  client.Radio = new Radio(config.env.youtube.apiKey);

  client.registry
    .registerDefaultTypes()
    .registerGroups([
      ['simple', 'Simple'],
      ['utils', 'Utilities'],
      ['radio', 'Radio'],
      ['voice', 'Voice'],
      ['swapi', 'Star Wars API'],
      ['help', 'Help'],
      ['playlist', 'Playlist'],
    ])
    .registerCommandsIn(path.join(__dirname, '..', 'commands'));

  client.once('ready', async () => {
    client.logger.success(`${client.user.username} starting`);
    const guilds = client.guilds.size;
    const channels = client.channels.size;
    const users = client.users.size;
    client.logger.success(
      `Connected to ${guilds} guilds, ${channels} channels and ${users} users`,
    );
    const activity = "Fo' shizzle my nizzle";
    client.logger.success(`Activity set to: ${activity}`);
    client.user.setActivity(activity);

    await client.nlp.train();
    client.nlp.save();
  });

  client.on('guildCreate', guildEventHandler.onCreate);
  client.on('guildDelete', guildEventHandler.onDelete);

  return client;
};

module.exports = {
  createClient,
};
