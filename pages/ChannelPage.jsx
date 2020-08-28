import React from 'react';
import { Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';

import ChannelButton from '../components/ChannelButton';
import ChannelContext from '../components/ChannelContext';

export default function ChannelPage({navigation}) {
    const {channels, isFetchingChannels} = React.useContext(ChannelContext);

    const openChannel = (channelURL) => {
        const urlToOpen = channels.find(url => url === channelURL)
        navigation.navigate('FeedPage', { url: urlToOpen })
    }

    if (isFetchingChannels) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.loading}>Fetching...</Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={channels}
                renderItem={(item) => (
                    <ChannelButton url={channels[item.index]} onPress={openChannel}/>
                )}
                keyExtractor={ item => item }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loading: {
        fontFamily: 'CourierPrime-Bold',
        fontSize: 20,
        color: '#fff'
    }
});