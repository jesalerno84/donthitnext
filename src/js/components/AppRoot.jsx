import React from 'react';
import TrackLoader from './TrackLoader';

const AppRoot = ({
    showLoader = false
}) => (
    <div>
        {showLoader ? 
            <TrackLoader />
        : 
            <h2>Let's do this!</h2>
        }
    </div>
);



export default AppRoot;
