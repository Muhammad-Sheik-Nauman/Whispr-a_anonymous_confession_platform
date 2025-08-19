const mongoose = require('mongoose');
 
const confessionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    ownerToken: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Confession', confessionSchema);
