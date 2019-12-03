const superagent = require('superagent');

const characters = async ({ search } = {}) => {
  let query = {};
  if (search) {
    query = { search };
  }

  const response = await superagent.get('https://swapi.co/api/people').query(query);
  if (response.body.count === 0) {
    return {
      status: 'notfound',
      code: response.status,
      payload: [],
    };
  }

  return {
    status: 'success',
    code: response.status,
    payload: response.body.results,
  };
};

module.exports = { characters };
