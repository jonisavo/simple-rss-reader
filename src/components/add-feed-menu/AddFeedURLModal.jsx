import React from 'react';
import { Text, StyleSheet, Modal, TextInput, View, KeyboardAvoidingView, TouchableHighlight, Dimensions } from 'react-native';

import ChannelContext from '../ChannelContext';
import { validateRSS } from '../../rss';

export default function AddFeedURLModal(props) {
    const { visible, onPressClose } = props;

    const [url, setUrl] = React.useState('');
    const [addingUrl, setAddingUrl] = React.useState(false);
    const { channels, saveUrl } = React.useContext(ChannelContext);

    const saveNewUrl = () => {
        if (channels.includes(url)) {
            alert('You already have this feed saved.');
            return;
        }
        if (url.length == 0) {
            alert('Enter an URL!');
            return;
        }
        setAddingUrl(true);
        validateRSS(url).then(valid => {
            if (valid) {
                saveUrl(url);
                onPressClose();
            } else {
                alert('The given feed is not valid.');
            }
        }).finally(() => setAddingUrl(false))
    }

    return (
        <Modal animationType='fade' visible={visible} transparent={true}>
            <View style={styles.centered}>
                <KeyboardAvoidingView style={styles.container}>
                    { !addingUrl ?
                        <>
                            <Text style={styles.text}>Add new feed:</Text>
                            <TextInput
                                placeholder='Enter URL here'
                                onChangeText={(text) => setUrl(text)}
                                style={styles.textInput}
                                placeholderTextColor='#555'
                                returnKeyType='done'
                                onSubmitEditing={saveNewUrl}
                                />
                            <TouchableHighlight style={styles.button} onPress={saveNewUrl}>
                                <Text>Save</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={onPressClose} style={styles.button}>
                                <Text>Cancel</Text>
                            </TouchableHighlight>
                        </>
                        : <Text style={styles.text}>Fetching feed...</Text> 
                    }
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        padding: 10,
        backgroundColor: '#23002D',
        borderStyle: 'solid',
        borderColor: '#EEE',
        borderWidth: 2,
        borderRadius: 8,
        maxHeight: Dimensions.get('screen').height / 2,
        width: Dimensions.get('screen').width - 32,
        maxWidth: 500
    },
    button: {
        marginVertical: 6,
        marginHorizontal: 5,
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFAA00',
        color: '#23002D'
    },
    text: {
        fontSize: 24,
        color: '#EEE',
        textAlign: 'center',
        marginBottom: 5
    },
    textInput: {
        borderStyle: 'solid',
        borderColor: '#EEE',
        borderWidth: 2,
        borderRadius: 10,
        padding: 8,
        margin: 5,
        fontSize: 18,
        color: '#EEE'
    }
})