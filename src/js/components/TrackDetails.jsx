import React from 'react';
import Relay from 'react-relay';

const TrackDetails = ({
    trackInfo
}) => (
    <tr>
        <td>
            <input type="checkbox" />
        </td>
        <td>
            {trackInfo.track.name}
        </td>
        <td>
            {trackInfo.track.artists[0].name}
        </td>
        <td>
            {trackInfo.track.album.name}
        </td>
        <td>
            {trackInfo.added_at}
        </td>
        <td>
            {millesecondsToMinutesAndSeconds(trackInfo.track.duration_ms)}
        </td>
    </tr>
);

const millesecondsToMinutesAndSeconds = (ms) => {
    return new Date(ms).toISOString().substr(14, 5);
};

export default Relay.createContainer(TrackDetails, {
    fragments: {
        trackInfo: () => Relay.QL`
            fragment on trackInfo {
                added_at,
                track {
                    name,
                    artists {
                        name
                    },
                    album {
                        name,
                        id
                    },
                    duration_ms
                }
            }
        `
    }
});