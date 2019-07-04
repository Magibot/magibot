const mongoose = require('../database');

const ActivitySchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    used: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Activity', ActivitySchema);
