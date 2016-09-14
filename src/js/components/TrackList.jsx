import React from 'react';
import TrackDetails from './TrackDetails';

export const TrackList = ({
    tracks
}) => (
    <tbody>
        {getTrackNodes(tracks)}
    </tbody>
);

const getTrackNodes = tracks => {
    return tracks && tracks.edges ? tracks.edges.map((edge, i) => {
        return (
            <TrackDetails key={i} trackInfo={edge.node} />
        );
    }) : null;
};

export default TrackList;