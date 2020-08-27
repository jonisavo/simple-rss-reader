import React from 'react';
import { FlatList } from 'react-native';
import FeedItemButton from './FeedItemButton';

export default function FeedView(props) {
    if (!props.feed) return null;

    const renderFeed = ({ item }) => (
        <FeedItemButton feed={props.feed} item={item} />
    );

    return (
        <FlatList
            data={props.feed.items}
            renderItem={renderFeed}
            keyExtractor={item => item.id}
        />
    )
}