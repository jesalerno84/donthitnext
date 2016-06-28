const SpotifyStrategy = require('passport-spotify').Strategy;
const authConfig = require('./auth');
const User = require('../models/user.js');

module.exports = passport => {
    passport.serializeUser((user, done) => {
        done(null, user.spotify_id);
    });
    passport.deserializeUser((id, done) => {
        User.findBySpotifyId(id, (err, result) => {
            done(err, result);
        });
    });

    passport.use(new SpotifyStrategy({
        clientID: authConfig.clientId,
        clientSecret: authConfig.clientSecret,
        callbackURL: authConfig.callbackUrl
    }, (accessToken, refreshToken, params, profile, done) => {
        profile.auth = {
            accessToken,
            refreshToken,
            expiresIn: params.expires_in
        };
        User.findOrCreateWithToken(profile, (err, user) => {
            return done(err, user);
        })
    }));
};