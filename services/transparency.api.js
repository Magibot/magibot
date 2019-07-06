const axios = require('axios');

module.exports = axios.create({
  baseURL: 'http://www.transparencia.gov.br/api-de-dados',
});
