import request from 'superagent';

export const importTracks = () => {
    request
        .post('/api/tracks/all')
        .end();
};