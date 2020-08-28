import React from 'react';

const ChannelContext = React.createContext();

const ChannelProvider = (props) => {
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

    return (
        <ChannelContext.Provider value={{ channels, setChannels, isFetchingChannels }}>
            {props.children}
        </ChannelContext.Provider>
    )
}

export default ChannelContext;

export { ChannelProvider }