import React from 'react';
import TrackDetails from './TrackDetails';

export const TrackList = ({
    tracks
}) => (
    <div>
        <h2>TrackList</h2>
        {getTrackNodes(tracks)}
    </div>
);

const getTrackNodes = tracks => {
    return tracks && tracks.edges ? tracks.edges.map((edge, i) => {
        return (
            <TrackDetails key={i} trackInfo={edge.node} />
        );
    }) : null;
};

export default TrackList;