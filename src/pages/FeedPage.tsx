import React from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text } from 'react-native';
import type { FeedItem } from 'react-native-rss-parser';
import type { Props } from './NavigationTypes';

import FeedItemButton from '../components/FeedItemButton';
import FeedHeader from '../components/FeedHeader';
import { getRSS } from '../rss';

export default function FeedPage({ navigation, route }: Props): JSX.Element {
  const [feed, setFeed] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useLayoutEffect(() => {
    if (feed) {
      navigation.setOptions({
        headerShown: true,
        header: () => <FeedHeader feed={feed} />,
      });
    } else {
      navigation.setOptions({
        headerShown: false,
      });
    }
  }, [navigation, feed]);

  React.useEffect(() => {
    getRSS(route.params.url)
      .then(fetchedFeed => setFeed(fetchedFeed))
      .catch(error =>
        console.log(`Error while processing url ${route.params.url}: ${error}`),
      )
      .finally(() => setIsLoading(false));
  }, [route.params.url]);

  const openArticle = (article: FeedItem) =>
    navigation.navigate('ArticlePage', { article });

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loading}>Fetching feed...</Text>
      </SafeAreaView>
    );
  }

  if (!feed.items || feed.items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loading}>No items found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={feed.items || []}
        renderItem={item => (
          <FeedItemButton feed={feed} item={item.item} onPress={openArticle} />
        )}
        keyExtractor={item => item.id}
      />
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
