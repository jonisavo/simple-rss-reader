import React from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const ChannelContext = React.createContext();

const ChannelProvider = (props) => {
    const [channels, setChannels] = React.useState([]);
    const [isFetchingChannels, setIsFetchingChannels] = React.useState(true);
    const { getItem, setItem } = useAsyncStorage('@urls');

    const readUrlsFromStorage = async () => {
        const urls = JSON.parse(await getItem());
        setChannels(urls || []);
        setIsFetchingChannels(false);
    }

    const saveUrl = async (url) => {
        const urls = JSON.parse(await getItem()) || [];
        urls.push(url);
        setItem(JSON.stringify(urls));
        setChannels(urls);
    }

    React.useEffect(() => {
        readUrlsFromStorage();
    }, []);
   
    return (
        <ChannelContext.Provider value={{ channels, isFetchingChannels, saveUrl }}>
            {props.children}
        </ChannelContext.Provider>
    )
}

export default ChannelContext;

export { ChannelProvider }