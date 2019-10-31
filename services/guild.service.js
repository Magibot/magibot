const superagent = require('../config/superagent');
const env = require('../config/env');

const create = async guild => {
  try {
    const response = await superagent
      .post('/guilds')
      .send(guild)
      .set('Authorization', env.apiClientId)
      .set('authorization_type', 'client_id');

    return {
      status: 'success',
      code: response.statusCode,
      payload: response.body.payload
    };
  } catch (err) {
    // console.log(err);
    return {
      status: 'error',
      type: err.name,
      code: err.response.statusCode,
      errors: err.response.body.errors
    };
  }
};

const destroy = async guildId => {
  try {
    const response = await superagent
      .delete(`/guilds/${guildId}`)
      .set('Authorization', env.apiClientId)
      .set('authorization_type', 'client_id');

    return {
      status: 'success',
      code: response.statusCode,
      payload: response.body.payload
    };
  } catch (err) {
    return {
      status: 'error',
      type: err.name,
      code: err.response.statusCode,
      errors: err.response.body.errors
    };
  }
};

module.exports = {
  create,
  destroy
};
