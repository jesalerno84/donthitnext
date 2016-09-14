import React from 'react';

const TrackHeader = ({
    relay,
    onHeaderItemClick
}) => (
    <thead>
        <tr>
            <th>{''}</th>
            <th><a href="#" onClick={ev => onHeaderItemClick(ev, relay, 'NAME')}>Name</a></th>
            <th><a href="#" onClick={ev => onHeaderItemClick(ev, relay, 'ARTIST')}>Artist</a></th>
            <th><a href="#" onClick={ev => onHeaderItemClick(ev, relay, 'ALBUM')}>Album</a></th>
            <th><a href="#" onClick={ev => onHeaderItemClick(ev, relay, 'ADDED_ON')}>Date Added</a></th>
            <th><a href="#" onClick={ev => onHeaderItemClick(ev, relay, 5)}>Duration</a></th>
        </tr>
    </thead>
);

export default TrackHeader;