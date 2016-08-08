import React from 'react';
import {serverSentEventConnect} from 'react-server-sent-event-container';

const TrackLoader = () => (
    <div className="jumbotron">
        <h1>Retrieving your saved tracks</h1>
        <p>
            In order to build your playlists we need to grab your saved tracks.
        </p>
    </div>
);

export default serverSentEventConnect('/api/streams/tracks/all')(TrackLoader);

// //            h1 Retrieving your saved tracks
// //            p In order to build your playlists we need to grab your saved tracks.
// //            .progress
// //                div(id='saved-track-progress', class='progress-bar progress-bar-success', role='progressbar', aria-valuenow='0', aria-valuemin='0', aria-valuemax='100', style='width:40%').
// //                    40% Complete