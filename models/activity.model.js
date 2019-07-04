const mongoose = require('../database');

const ActivitySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  used: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Activity', ActivitySchema);
