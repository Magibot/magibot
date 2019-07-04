const mongoose = require('../database');

const PlaylistSchema = new mongoose.Schema(
  {
    guildId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    creatorMemberId: {
      type: Number,
      required: true,
    },
    allowOtherToModify: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Playlist', PlaylistSchema);
