import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';

import { getRSS } from './src/rss';

import FeedView from './components/FeedView';
import FeedHeader from './components/FeedHeader';

export default function App() {
  const [feed, setFeed] = useState(null);
  let [fontsLoaded] = useFonts({
    'CourierPrime': require('./assets/fonts/CourierPrime-Regular.ttf'),
    'CourierPrime-Bold': require('./assets/fonts/CourierPrime-Bold.ttf'),
    'CourierPrime-Italic': require('./assets/fonts/CourierPrime-Italic.ttf')
  });

  if (!feed) {
    getRSS('https://videos.lukesmith.xyz/feeds/videos.xml?accountId=3')
    .then(rss => setFeed(rss))
    .catch(err => alert(err));
  }

  if (!fontsLoaded) { return <AppLoading/> }

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        <FeedHeader feed={feed}/>
        <FeedView feed={feed}/>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight + 4
  }
});
