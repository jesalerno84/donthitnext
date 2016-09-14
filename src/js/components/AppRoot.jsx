import React from 'react';
import Relay from 'react-relay';

import TrackLoader from './TrackLoader';
import TrackList from './TrackList';
import TrackHeader from './TrackHeader';
import TrackFilters from './TrackFilters';
import TrackDetails from './TrackDetails';
import SearchBox from './SearchBox';

const sort = {
    sortBy: 'NAME',
    sortDirection: 'ASC'
};


const AppRoot = ({
    showLoader = false,
    collection,
    relay
}) => (
        <div>
            {showLoader ?
                <TrackLoader />
                :
                <div>
                    <SearchBox relay={relay} artists={collection.artists} onTextChanged={searchChanged} />
                    <TrackFilters />
                    <table>
                        <TrackHeader relay={relay} onHeaderItemClick={sortTracks} />
                        <TrackList tracks={collection.tracks}/>
                    </table>
                    <TrackFilters />
                </div>
            }
        </div>
    );

const sortTracks = (ev, relay, sortBy) => {
    ev.preventDefault();

    const sortDirection = sortBy === sort.sortBy ? (sort.sortDirection === 'ASC' ? 'DESC' : 'ASC') : 'ASC';

    relay.setVariables({
        sortBy,
        sortDirection
    });

    sort.sortBy = sortBy;
    sort.sortDirection = sortDirection;
};

const searchChanged = (ev, relay, value) => {
    ev.preventDefault();

    if (!value || (value && (value.length > 2 || value.length === 0))) {
        relay.setVariables({
            searchTerm: value
        });
    }
};


export default Relay.createContainer(AppRoot, {
    initialVariables: {
        count: 250,
        searchTerm: null,
        sortBy: sort.sortBy,
        sortDirection: sort.sortDirection
    },
    fragments: {
        collection: () => Relay.QL`
            fragment on collection {
                artists(searchTerm: $searchTerm) {
                    name
                },
                tracks(first: $count, sortBy: $sortBy, sortDirection: $sortDirection) {
                    edges {
                        cursor,
                        node {
                            ${TrackDetails.getFragment('trackInfo')}
                        }
                    },
                    pageInfo {
                        hasNextPage
                        hasPreviousPage
                        startCursor
                        endCursor
                    }
                }
            }
        `
    }
});
