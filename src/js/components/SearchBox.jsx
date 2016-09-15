import React from 'react';

const SearchBox = ({
    artists,
    relay,
    onArtistSelected,
    onTextChanged
}) => {
    let textNode;
    const artistNodes = artists ? artists.map((artist, i) => {
        return (
            <li key={i}>
                <a href="#" onClick={ev => {
                    onArtistSelected(ev, relay, artist.name);
                    textNode.value = '';
                }}>
                    {artist.name}
                </a>
            </li>
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