import React from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const ChannelContext = React.createContext({
  channels: [],
  isFetchingChannels: true,
  saveUrl: null,
  removeUrl: null,
});

const ChannelProvider = (props): JSX.Element => {
  const [channels, setChannels] = React.useState([]);
  const [isFetchingChannels, setIsFetchingChannels] = React.useState(true);
  const { getItem, setItem } = useAsyncStorage('@urls');

  const { children } = props;

  const readUrlsFromStorage = async () => {
    const urls = JSON.parse(await getItem());
    setChannels(urls || []);
    setIsFetchingChannels(false);
  };

  const saveUrl = async (url: string) => {
    const urls = JSON.parse(await getItem()) || [];
    urls.push(url);
    setItem(JSON.stringify(urls));
    setChannels(urls);
  };

  const removeUrl = async (url: string) => {
    const urls = JSON.parse(await getItem()) || [];
    const index = urls.indexOf(url);
    if (index < 0) return;
    urls.splice(index, 1);
    setItem(JSON.stringify(urls));
    setChannels(urls);
  };

  React.useEffect(() => {
    readUrlsFromStorage();
  }, [readUrlsFromStorage]);

  return (
    <ChannelContext.Provider
      value={{ channels, isFetchingChannels, saveUrl, removeUrl }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

export default ChannelContext;

export { ChannelProvider };
