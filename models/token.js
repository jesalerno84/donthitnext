const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    accessToken: String,
    refreshToken: String,
    expiresIn: Number,
    created_at: { type: Date, default: Date.now }
});

module.exports = tokenSchema;