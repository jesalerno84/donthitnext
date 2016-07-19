const mongoose = require('mongoose');

const trackSchema = mongoose.Schema({
    user_id: Number,
    created_at: { type: Date, default: Date.now },
    track: {type: Object}
}, {strict: false});

module.exports = mongoose.model('Track', trackSchema);
