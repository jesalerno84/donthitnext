import Relay from 'react-relay';

export const mainRoute = {
    queries: {
        tracks: () => Relay.QL`
            query {

            }
        `
    },
    params: {},
    name: 'MainRoute'
};