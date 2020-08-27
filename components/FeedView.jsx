import React from 'react';
import { FlatList } from 'react-native';
import ArticleButton from './ArticleButton';

export default function FeedView(props) {
    if (!props.feed) return null;

    const renderFeed = ({ item }) => (
        <ArticleButton feed={props.feed} article={item} />
    );

    return (
        <FlatList
            data={props.feed.items}
            renderItem={renderFeed}
            keyExtractor={item => item.id}
        />
    )
}