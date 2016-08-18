import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';
import Relay, {RootContainer} from 'react-relay';

import AppRoot from './components/AppRoot';
import MainRoute from './routes/mainRoute';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:8080/graphql', {
    credentials: 'same-origin',
  })
);

const mainRoute = new MainRoute();

render(
    <RootContainer
        Component={AppRoot}
        route={mainRoute}
     />,
    document.getElementById('content')
);
