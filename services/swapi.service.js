const superagent = require('superagent');
const superagentAbsolute = require('superagent-absolute');

const agent = superagent.agent();
const swapi = superagentAbsolute(agent)('https://swapi.co/api');


const characters = async ({ search } = {}) => {
  let query = {};
  if (search) {
    query = { search };
  }

  const response = await swapi.get('/people').query(query);
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

const movieByEpisodeId = async (id) => {
  const response = await swapi.get('/films');
  if (response.body.count === 0) {
    return {
      status: 'notfound',
      code: response.status,
      payload: [],
    };
  }

  const filtered = response.body.results.filter((movie) => movie.episode_id === id);
  if (!filtered || filtered.length === 0) {
    return {
      status: 'notfound',
      code: response.status,
      payload: [],
    };
  }

  const movie = filtered[0];

  return {
    status: 'success',
    code: response.status,
    payload: { movie },
  };
};

const movies = async ({ search } = {}) => {
  let query = {};
  if (search) {
    query = { search };
  }

  const response = await swapi.get('/films').query(query);
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

module.exports = { characters, movieByEpisodeId, movies };
