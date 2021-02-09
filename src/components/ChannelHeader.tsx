import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

export default function ChannelHeader(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Feeds</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#000',
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: 'CourierPrime-Bold',
    fontSize: 25,
    paddingVertical: 5,
    color: '#fff',
  },
  description: {
    fontFamily: 'CourierPrime-Italic',
    color: '#ddd',
  },
});
