import React from 'react';
import Relay from 'react-relay';

import TrackLoader from './TrackLoader';
import TrackList from './TrackList';


const AppRoot = ({
    showLoader = false
}) => (
    <div>
        {showLoader ? 
            <TrackLoader />
        : 
            <TrackList />
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
                        added_at,
                        track {
                            name,
                            artists {
                            name
                            },
                            album {
                            name
                            }
                        }
                        }
                    }
                }
            }
        `
    }
});
