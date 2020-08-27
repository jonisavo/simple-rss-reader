import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getArticleAuthors, getArticleDate } from '../src/rss';

export default function ArticleButton(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.article.title}</Text>
            <Text style={styles.authors}>{getArticleAuthors(props.feed,props.article)}</Text>
            {!!props.article.published && <Text style={styles.authors}>{getArticleDate(props.article)}</Text>}
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