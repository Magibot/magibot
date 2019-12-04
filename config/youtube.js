const { google } = require('googleapis');

const create = (apiKey) => google.youtube({
  version: 'v3',
  auth: apiKey,
});

module.exports = {
  create,
};
