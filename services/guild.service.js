const superagent = require('../config/superagent');
const config = require('../config/bot');

const create = async (guild) => {
  try {
    const response = await superagent
      .post('/guilds')
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
    const response = await superagent
      .delete(`/guilds/${guildId}`)
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
