import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, GestureResponderEvent } from 'react-native';

import type { FeedItem } from 'react-native-rss-parser';
import { getItemAuthors, getItemDate } from '../rss';
import type { FeedWrapper } from '../rss';

type InfoProps = {
  feed: FeedWrapper;
  item: FeedItem;
};

type ButtonProps = InfoProps & {
  onPress: (event: GestureResponderEvent) => void;
};

function FeedItemInfo(props: InfoProps): JSX.Element {
  const { feed, item } = props;

  const authors = getItemAuthors(feed, item);
  const date = getItemDate(item) || 'Invalid Date';
  return (
    <>
      {authors.length > 0 && (
        <Text style={styles.authors}>{getItemAuthors(feed, item)}</Text>
      )}
      {date !== 'Invalid Date' && (
        <Text style={styles.authors}>{getItemDate(item)}</Text>
      )}
    </>
  );
}

export default function FeedItemButton(props: ButtonProps): JSX.Element {
  const { feed, item, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress.bind(this, item)}>
      <View style={styles.container}>
        <Text style={styles.title}>{item.title}</Text>
        <FeedItemInfo feed={feed} item={item} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: '#23002D',
    borderStyle: 'solid',
    borderColor: '#EEE',
    borderWidth: 2,
    borderRadius: 8,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontFamily: 'SourceSansPro',
    color: '#FFAA00',
  },
  authors: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'CourierPrime',
    color: '#ccc',
  },
});
