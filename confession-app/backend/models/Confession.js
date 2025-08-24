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
    
  },
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: {
    type: String,
    required: true
  },
  report:{

  },
  report: {
    type: [String],
    default: []
  },
  reportedBy: {
    type: [String],
    default: []
  }
  
});

module.exports = mongoose.model("Confession", confessionSchema);
