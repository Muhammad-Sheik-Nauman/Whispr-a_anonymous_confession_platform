const mongoose = require("mongoose");

const confessionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  ownerToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 2
  }
});

module.exports = mongoose.model("Confession", confessionSchema);
