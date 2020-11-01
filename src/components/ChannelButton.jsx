import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getRSS, getItemDate } from '../rss';

export default function ChannelButton(props) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [title, setTitle] = React.useState('');
    const [lastUpdated, setLastUpdated] = React.useState('');

    React.useEffect(() => {
        getRSS(props.url)
            .then(feed => {
                setTitle(feed.title || "[No Title]");
                setLastUpdated(getItemDate(feed.itemAt(0)));
            })
            .catch(error => console.log(`Error while processing url ${props.url}: ${error}`))
            .finally(() => setIsLoading(false))
    }, [props.url]);

    if (isLoading) {
        return (
            <TouchableOpacity>
                <View style={styles.container}>
                    <Text style={styles.title}>Loading...</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity onPress={props.onPress.bind(this, props.url)}>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                {!!lastUpdated && <Text style={styles.date}>Last updated: {lastUpdated}</Text>}
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
        fontSize: 16,
        fontFamily: 'SourceSansPro',
        color: '#FFAA00'
    },
    date: {
        flex: 1,
        fontSize: 13,
        fontFamily: 'CourierPrime',
        color: '#ddd'
    }
})