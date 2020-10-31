import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { getItemAuthors, getItemDate } from '../rss';

function FeedItemInfo(props) {
    let authors = getItemAuthors(props.feed,props.item);
    let date = getItemDate(props.item) || 'Invalid Date';
    return (
        <>
            {authors.length > 0 && <Text style={styles.authors}>{getItemAuthors(props.feed,props.item)}</Text>}
            {date != 'Invalid Date' && <Text style={styles.authors}>{getItemDate(props.item)}</Text>}
        </>
    )
}

export default function FeedItemButton(props) {
    return (
        <TouchableOpacity onPress={props.onPress.bind(this,props.item)}>
            <View style={styles.container}>
                <Text style={styles.title}>{props.item.title}</Text>
                <FeedItemInfo feed={props.feed} item={props.item}/>
            </View>
        </TouchableOpacity>
    )
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
        borderRadius: 8
    },
    title: {
        flex: 1,
        fontSize: 17,
        fontFamily: 'SourceSansPro',
        color: '#FFAA00'
    },
    authors: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'CourierPrime',
        color: '#ccc'
    }
})