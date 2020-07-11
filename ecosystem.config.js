module.exports = {
  apps: [{
    name: 'elis-discord-bot',
    script: './app/index.js',
    instances: 'max',
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],
};
