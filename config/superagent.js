const superagent = require('superagent');
const superagentAbsolute = require('superagent-absolute');
const config = require('./bot');

const agent = superagent.agent();

module.exports = superagentAbsolute(agent)(config.env.backend.api.baseUrl);
