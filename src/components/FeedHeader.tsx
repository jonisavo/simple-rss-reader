import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import type { FeedWrapper } from '../rss';

type Props = {
  feed: FeedWrapper;
};

function FeedInformation(props: Props): JSX.Element {
  const { feed } = props;

  const updatedDate = feed.getLastUpdatedDate();

  return (
    <>
      {!!feed.description && (
        <Text style={styles.description}>{feed.description}</Text>
      )}
      {feed.authorCount() > 0 && (
        <Text style={styles.authors}>{feed.getAuthorNames()}</Text>
      )}
      {updatedDate && (
        <Text style={styles.authors}>Last updated: {updatedDate}</Text>
      )}
    </>
  );
}

export default function FeedHeader(props: Props): JSX.Element {
  const { feed } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{feed?.title || '[No Title]'}</Text>
      <FeedInformation feed={feed} />
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
    fontSize: 20,
    paddingVertical: 5,
    color: '#fff',
  },
  description: {
    fontFamily: 'CourierPrime-Italic',
    color: '#ddd',
  },
  authors: {
    fontFamily: 'CourierPrime',
    color: '#ddd',
  },
});
