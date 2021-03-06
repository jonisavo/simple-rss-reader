import React from 'react';
import { Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import type { Props } from './NavigationTypes';

import ChannelButton from '../components/ChannelButton';
import ChannelContext from '../components/ChannelContext';
import AddFeedMenu from '../components/add-feed-menu/AddFeedMenu';

export default function ChannelPage({ navigation }: Props): JSX.Element {
  const { channels, isFetchingChannels } = React.useContext(ChannelContext);

  const openChannel = (channelURL: string) =>
    navigation.navigate('FeedPage', { url: channelURL });

  if (isFetchingChannels) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loading}>Fetching...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {channels.length > 0 ? (
        <FlatList
          data={channels}
          renderItem={item => (
            <ChannelButton url={channels[item.index]} onPress={openChannel} />
          )}
          keyExtractor={(item, index) => item || index.toString()}
        />
      ) : (
        <Text style={styles.loading}>No feeds found.</Text>
      )}
      <AddFeedMenu />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    fontFamily: 'CourierPrime-Bold',
    fontSize: 20,
    color: '#fff',
  },
});
