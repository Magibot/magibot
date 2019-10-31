const env = require('./config/env');
const Commando = require('discord.js-commando');

const bot = new Commando.Client({
  commandPrefix: '!magi',
  unknownCommandResponse: false,
  disableEveryone: true
});

bot.on('ready', () => {
  console.log(`${bot.user.username} starting`);
  const guilds = bot.guilds.size;
  const channels = bot.channels.size;
  const users = bot.users.size;
  console.log(
    `Connected to ${guilds} guilds, ${channels} channels and ${users} users`
  );
  bot.user.setActivity("Fo' shizzle my nizzle");
});

// bot.on('guildCreate', EventHandler.onGuildCreate);
// bot.on('guildDelete', EventHandler.onGuildDelete);

// bot.on('disconnect');

bot.login(env.token);
