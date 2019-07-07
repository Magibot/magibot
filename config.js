require('dotenv').config();

module.exports = {
  name: 'Magibot',
  description: 'A bot that helps you walk through the labyrinth of magic, or just Discord.',
  repository: 'https://github.com/mellomaths/magibot',
  logo:
    'https://media.discordapp.net/attachments/479070673264967693/595796864926875649/magi_aladdin3.jpg?width=746&height=420',
  database: {
    uri: process.env.MONGODB_URI,
  },
  app: {
    prefix: 'magi ',
    token: process.env.NODE_ENV === 'production' ? process.env.TOKEN : process.env.TESTING_TOKEN,
  },
  server: {
    mainChannel: 'magibot-config',
    newMemberRole: 'Soldier',
  },
  messages: {
    colors: {
      memberRemove: '0xcc6600',
      memberAdd: '0x00cc7a',
      main: '0x99e6ff',
    },
  },
  services: {
    api: {
      transparency: {
        baseUrl: 'http://www.transparencia.gov.br/api-de-dados',
        bolsaFamiliaByCityEndpoint: '/bolsa-familia-por-municipio',
      },
    },
  },
};
