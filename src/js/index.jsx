import React from 'react';
import {render} from 'react-dom';
import {RootContainer} from 'react-relay';

import AppRoot from './components/AppRoot';
import MainRoute from './routes/mainRoute';

const mainRoute = new MainRoute();

render(
    <RootContainer
        Component={AppRoot}
        route={mainRoute}
     />,
    document.getElementById('content')
);
