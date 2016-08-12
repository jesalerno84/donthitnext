import React from 'react';
import {render} from 'react-dom';
import {RootContainer} from 'react-relay';

import AppRoot from './components/AppRoot';


render(
    <RootContainer
        Component={AppRoot}
     />,
    document.getElementById('content')
);
