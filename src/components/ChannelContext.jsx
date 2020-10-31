import React from 'react';

import { channels } from '../channels'

const ChannelContext = React.createContext();

const ChannelProvider = (props) => {
    // THIS CODE WAS USED TO FETCH RSS URLs FROM MY WEB SERVER.
    // IT CAUSED AWFUL LOAD TIMES, THOUGH, SO THE RSS URLs ARE HARDCODED
    // IN /src/channels.jsx FOR NOW.
    /*
    const [channels, setChannels] = React.useState([]);
    const [isFetchingChannels, setIsFetchingChannels] = React.useState(true);

    const updateChannels = (urls) => setChannels(urls.filter(url => url.length > 0));

    React.useEffect(() => {
        // Fetch all RSS URLs
        fetch('https://static.jonisavo.xyz/rss.txt')
            .then(response => response.text())
            .then(str => str ? str.split('\n') : [])
            .then(lines => updateChannels(lines))
            .catch(error => alert(error))
            .finally(() => setIsFetchingChannels(false));
    }, [])
    */

    const isFetchingChannels = false;
   
    return (
        <ChannelContext.Provider value={{ channels, isFetchingChannels }}>
            {props.children}
        </ChannelContext.Provider>
    )
}

export default ChannelContext;

export { ChannelProvider }