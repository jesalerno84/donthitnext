module.exports = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackUrl: 'http://localhost:3000/auth/spotify/callback'
};