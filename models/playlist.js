const mongoose = require('mongoose');

const playlistSchema = mongoose.schema({
    name: String,
    user_id: Number,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Playlist', playlistSchema);
