const mongoose = require('../database');

const CitySchema = new mongoose.Schema(
  {
    idName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    ibgeCode: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('City', CitySchema);
