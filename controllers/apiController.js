const express = require('express');
const request = require('request');
const passport = require('passport');
const ensureAuthenticated = require('../middlewares/auth');
const router = express.Router();

const Track = require('../models/track');
const spotifyUrls = require('../config/spotifyUrls');

const connections = [];

router.get('/tracks/all', (req, res) => {
    if (req.user) {
        const limit = 50;
        const url = `${spotifyUrls.SAVED_TRACKS}?limit=${limit}`;

        getTracks(url, req.user, res);
        res.status(200);
    } else {
        res.status(401).send('not authorized');
    }
});
    
router.get('/streams/tracks/all', (req, res) => {
    res.sseSetup();
    res.sseSend({
        loaded: 0,
        total: 0
    }, 'savedTracks');
    connections.push(res); 
});

const getTracks = (url, user, res) => {
    
    if (url) {
        request(url, {'auth': {'bearer': user.token.accessToken}}, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                const results = JSON.parse(body);
                const itemsLength = results && results.items ? results.items.length : 0;
                const loaded = results.offset + itemsLength;
                const total = results.total;
                const items = results.items.map(i => Object.assign({}, i, {spotify_id: user.spotify_id}));
                
                Track.collection.insert(items, (err, docs) => {
                    if (!error) {
                        for (var i = 0; i < connections.length; i++) {
                            connections[i].sseSend({
                                loaded,
                                total
                            }, 'savedTracks');            
                        }
                    }
                });
                getTracks(results.next, user, res);
            } else if (response.statusCode === 502) {
                getTracks(url, user, res);
            } else {
                //console.log(error);
                console.log(response.statusCode);
            }
        });
    
    }
};

module.exports = router;