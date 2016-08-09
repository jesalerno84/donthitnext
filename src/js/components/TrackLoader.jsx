import React from 'react';
import {serverSentEventConnect} from 'react-server-sent-event-container';
import {importTracks} from '../services/trackService';

const TrackLoader = ({
    percentage,
    tracksLoaded,
    tracksTotal
}) => (
        <div className="jumbotron">
            <div>
                <h1>Retrieving your saved tracks</h1>
                <p>
                    In order to build your playlists we need to grab your saved tracks.
                </p>
                <div className="progress">
                    <div id="saved-track-progress" className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{ width: `${percentage}%` }}>
                        {percentage}% Completed
                    </div>
                </div>
            </div>
        </div>
    );

const eventObj = {
    savedTracks: (event, props, source) => {
        const results = JSON.parse(event.data);
        console.log(results.loaded + '/' + results.total);
        const percentage = parseInt(results.loaded / results.total * 100);
        props.update({
            percentage,
            tracksLoaded: results.loaded,
            tracksTotal: results.total
        });

        if (percentage === 100) {
            event.target.close();
        }
    }
};

export default serverSentEventConnect('/api/streams/tracks/all', false, null, null, null, eventObj)(TrackLoader);