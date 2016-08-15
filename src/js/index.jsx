import React from 'react';
import {render} from 'react-dom';
import {RootContainer} from 'react-relay';

import AppRoot from './components/AppRoot';
import mainRoute from './routes/mainRoute';


render(
    <RootContainer
        Component={AppRoot}
        Route={mainRoute}
     />,
    document.getElementById('content')
);
