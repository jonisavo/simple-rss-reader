import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getItemAuthors, getItemDate } from '../src/rss';

function FeedItemInfo(props) {
    let authors = getItemAuthors(props.feed,props.item);
    let date = getItemDate(props.item);
    return (
        <>
            {authors.length > 0 && <Text style={styles.authors}>{getItemAuthors(props.feed,props.item)}</Text>}
            {date != 'Invalid Date' && <Text style={styles.authors}>{getItemDate(props.item)}</Text>}
        </>
    )
}

export default function FeedItemButton(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.item.title}</Text>
            <FeedItemInfo feed={props.feed} item={props.item}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 10,
        backgroundColor: '#C44DFF',
        borderRadius: 8
    },
    title: {
        flex: 1,
        fontSize: 15,
        fontFamily: 'CourierPrime',
        color: '#fff'
    },
    authors: {
        flex: 1,
        fontSize: 13,
        fontFamily: 'CourierPrime',
        color: '#ccc'
    }
})