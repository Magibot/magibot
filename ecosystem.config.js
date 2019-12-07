module.exports = {
  apps: [{
    name: 'Magibot',
    script: './app.js',
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
