const superagent = require('superagent');
const superagentAbsolute = require('superagent-absolute');
const config = require('../../config/bot');

const agent = superagent.agent();
const apiPath = `${config.env.backend.api.baseUrl}/guilds`;
const guildApi = superagentAbsolute(agent)(apiPath);

const create = async (guild) => {
  try {
    const response = await guildApi
      .post('/')
      .send(guild)
      .set('Authorization', config.env.backend.api.clientId)
      .set('authorization_type', 'client_id');

    return {
      status: 'success',
      code: response.statusCode,
      payload: response.body.payload,
    };
  } catch (err) {
    return {
      status: 'error',
      type: err.name,
      code: err.response.statusCode,
      errors: err.response.body.errors,
    };
  }
};

const destroy = async (guildId, query) => {
  try {
    const response = await guildApi
      .delete(`/${guildId}`)
      .query(query)
      .set('Authorization', config.env.backend.api.clientId)
      .set('authorization_type', 'client_id');

    return {
      status: 'success',
      code: response.statusCode,
      payload: response.body.payload,
    };
  } catch (err) {
    return {
      status: 'error',
      type: err.name,
      code: err.response.statusCode,
      errors: err.response.body.errors,
    };
  }
};

module.exports = {
  create,
  destroy,
};
