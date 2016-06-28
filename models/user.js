const mongoose = require('mongoose');

const tokenSchema = require('./token');

const userSchema = mongoose.Schema({
    spotify_id: String,
    username: String,
    avatar: String,
    email: String,
    token: tokenSchema,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

userSchema.statics.findOrCreateWithToken = function (profile, cb) {
    var userObj = new this();
    this.findOne({ spotify_id: profile.id }, (err, result) => {
        if (!result) {
            userObj.username = profile.displayName;
            userObj.spotify_id = profile.id;
            userObj.avatar = profile.photos && profile.photos.length > 0 ? profile.photos[0] : null;
            userObj.email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
            userObj.token = profile.auth;
            userObj.save(cb);
        } else {
            result.token = profile.auth;
            result.save(cb);
        }
    });
};

userSchema.statics.findBySpotifyId = function (id, cb) {
    this.findOne({spotify_id: id}, (err, result) => {
        cb(err, result);
    })
}

module.exports = mongoose.model('User', userSchema);