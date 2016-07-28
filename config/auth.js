module.exports = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackUrl: 'http://localhost:8080/auth/spotify/callback'
};