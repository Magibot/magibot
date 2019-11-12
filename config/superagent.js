const superagent = require('superagent');
const superagentAbsolute = require('superagent-absolute');
const env = require('./env');

const agent = superagent.agent();

module.exports = superagentAbsolute(agent)(env.backend.api.baseUrl);
