const mongoose = require('../database');

const TrackSchema = new mongoose.Schema(
  {
    playlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Playlist',
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    addedBy: {
      type: Number,
      required: true,
    },
    info: {
      type: Object,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Track', TrackSchema);
