import React from 'react';
import Relay from 'react-relay';

import TrackLoader from './TrackLoader';
import TrackList from './TrackList';
import TrackDetails from './TrackDetails';


const AppRoot = ({
    showLoader = false,
    collection
}) => (
    <div>
        {showLoader ? 
            <TrackLoader />
        : 
            <TrackList tracks={collection.tracks}/>
        }
    </div>
);



export default Relay.createContainer(AppRoot, {
    fragments: {
        collection: () => Relay.QL`
            fragment on collection {
                tracks(first: 10) {
                    edges {
                        cursor,
                        node {
                            ${TrackDetails.getFragment('trackInfo')}
                        }
                    }
                }
            }
        `
    }
});
