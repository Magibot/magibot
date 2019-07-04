const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.database.uri, { useNewUrlParser: true, useCreateIndex: true });

mongoose.Promise = global.Promise;

module.exports = mongoose;
