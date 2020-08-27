import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function FeedInformation(props) {
    let updatedDate = props.feed.getLastUpdatedDate();
    return (
        <>
            {!!props.feed.description && <Text style={styles.description}>{props.feed.description}</Text>}
            {props.feed.authorCount() > 0 && <Text style={styles.authors}>{props.feed.getAuthorNames()}</Text>}
            {updatedDate && <Text style={styles.authors}>Last updated: {updatedDate}</Text>}
        </>
    )
}

export default function FeedHeader(props) {
    if (!props.feed) { return <Text style={styles.title}>Loading...</Text> }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.feed.title}</Text>
            <FeedInformation feed={props.feed}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 10
    },
    title: {
        fontFamily: 'CourierPrime-Bold',
        fontSize: 20,
        paddingVertical: 5,
        color: '#FFFF11'
    },
    description: {
        fontFamily: 'CourierPrime-Italic',
        color: '#ddd'
    },
    authors: {
        fontFamily: 'CourierPrime',
        color: '#ddd'
    }
})