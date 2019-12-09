const superagent = require('superagent');
const superagentAbsolute = require('superagent-absolute');
const config = require('../config/bot');

const agent = superagent.agent();
const apiPath = `${config.env.backend.api.baseUrl}`;
const api = superagentAbsolute(agent)(apiPath);

const create = async (guildId, playlist) => {
  try {
    const response = await api
      .post(`/guilds/${guildId}/playlists`)
      .send(playlist)
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
};
