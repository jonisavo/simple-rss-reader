import React from 'react';

import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

import Navigator from './src/components/Navigator';
import { ChannelProvider } from './src/components/ChannelContext';

export default function App(): JSX.Element {
  const [fontsLoaded] = useFonts({
    CourierPrime: require('./assets/fonts/CourierPrime-Regular.ttf'),
    'CourierPrime-Bold': require('./assets/fonts/CourierPrime-Bold.ttf'),
    'CourierPrime-Italic': require('./assets/fonts/CourierPrime-Italic.ttf'),
    SourceSansPro: require('./assets/fonts/SourceSansPro-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ChannelProvider>
      <StatusBar style="light" />
      <Navigator />
    </ChannelProvider>
  );
}
