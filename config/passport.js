const SpotifyStrategy = require('passport-spotify').SpotifyStrategy;
const authConfig = require('./auth');

module.exports = passport => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        done(null, id);
    });

    passport.use(new SpotifyStrategy({
        clientID: authConfig.clientId,
        clientSecret: authConfig.clientSecret,
        callbackURL: authConfig.callbackUrl
    }, (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
            // To keep the example simple, the user's spotify profile is returned to
            // represent the logged-in user. In a typical application, you would want
            // to associate the spotify account with a user record in your database,
            // and return that user instead.
            return done(null, profile);
        });
    }));
};