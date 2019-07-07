const axios = require('axios');
const config = require('../config');

module.exports = axios.create({
  baseURL: config.services.api.transparency.baseUrl,
});
