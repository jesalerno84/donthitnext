import React from 'react';

const SearchBox = ({
    artists,
    relay,
    onTextChanged
}) => {
    let textNode;
    const artistNodes = artists ? artists.map((artist, i) => {
        return (
            <li key={i}>{artist.name}</li>
        );
    }) : null;
    return (
        <div>
            <input ref={node => textNode = node} onChange={ev => onTextChanged(ev, relay, textNode.value) } type="text" />
            <ul>
                {artistNodes}
            </ul>
        </div>
    );
};

export default SearchBox;