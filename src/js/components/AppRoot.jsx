import React from 'react';
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



export default AppRoot;
