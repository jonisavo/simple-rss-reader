import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { FeedItem } from 'react-native-rss-parser';

import ChannelPage from '../pages/ChannelPage';
import ChannelHeader from './ChannelHeader';
import FeedPage from '../pages/FeedPage';
import ArticlePage from '../pages/ArticlePage';

type StackParams = {
  article: FeedItem;
};

const Stack = createStackNavigator<StackParams>();

export default function Navigator(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ChannelPage"
        screenOptions={{
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontFamily: 'CourierPrime-Bold' },
        }}
      >
        <Stack.Screen
          name="ChannelPage"
          component={ChannelPage}
          options={{ header: () => <ChannelHeader /> }}
        />
        <Stack.Screen name="FeedPage" component={FeedPage} />
        <Stack.Screen name="ArticlePage" component={ArticlePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
