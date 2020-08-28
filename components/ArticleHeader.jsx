import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

export default function ArticleHeader(props) {
    const { article } = props;
    const authors = article.authors.map(author => author.name).join(', ');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{article.title}</Text>
            {!!authors && <Text style={styles.description}>Written by {authors}</Text>}
            {!!article.published && <Text style={styles.description}>on {article.published}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#000',
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 10,
        paddingHorizontal: 10
    },
    title: {
        fontFamily: 'CourierPrime-Bold',
        fontSize: 20,
        paddingVertical: 5,
        color: '#fff'
    },
    description: {
        fontFamily: 'CourierPrime-Italic',
        color: '#ddd'
    },
})