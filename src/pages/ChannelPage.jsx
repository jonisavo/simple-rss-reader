import React from 'react';
import { Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';

import ChannelButton from '../components/ChannelButton';
import ChannelContext from '../components/ChannelContext';
import AddFeedMenu from '../components/add-feed-menu/AddFeedMenu';

export default function ChannelPage({navigation}) {
    const {channels, isFetchingChannels} = React.useContext(ChannelContext);

    const openChannel = (channelURL) => navigation.navigate('FeedPage', { url: channelURL });

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
                keyExtractor={ (item,index) => item ? item : index.toString() }
            />
            <AddFeedMenu/>
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