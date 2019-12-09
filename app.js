const Discord = require('./config/discord');

const client = Discord.createClient();

process
  .on('unhandledRejection', (reason, p) => {
    client.logger.error('Unhandled Rejection at Promise');
    console.error(reason, p);
  })
  .on('uncaughtException', (err) => {
    client.logger.error('Uncaught Exception thrown');
    console.error(err);
  });

client.login(client.config.env.discord.token);
