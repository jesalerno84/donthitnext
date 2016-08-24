import React from 'react';
import Relay from 'react-relay';

const TrackDetails = ({
    trackInfo
}) => (
    <div>
        {trackInfo.track.artists[0].name}
        {trackInfo.track.name}
        {trackInfo.track.album.name}
        {trackInfo.added_at}
    </div>
);

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
                    }
                }
            }
        `
    }
});