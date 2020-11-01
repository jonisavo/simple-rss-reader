import React from 'react';
import { Text, StyleSheet, Modal, View, KeyboardAvoidingView, TouchableHighlight, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

import ChannelContext from '../ChannelContext';
import { validateRSS } from '../../rss';

export default function AddFeedQRModal(props) {
    const { visible, onPressClose } = props;

    const [permission, askForPermission] = Permissions.usePermissions(Permissions.CAMERA);
    const [openedQR, setOpenedQR] = React.useState(false);
    const [addingUrl, setAddingUrl] = React.useState(false);
    const { channels, saveUrl } = React.useContext(ChannelContext);

    const startQRScan = async () => {
        if (!permission || !permission.granted) {
            await askForPermission();
        }
        setOpenedQR(permission && permission.granted);
    }

    const codeScanned = ({ data }) => {
        setOpenedQR(false);
        if (channels.includes(data)) {
            alert('You already have this feed saved.');
            return;
        }
        setAddingUrl(true);
        validateRSS(data).then(valid => {
            console.log(`RSS validity test ran, result is ${valid}`)
            if (valid) {
                saveUrl(data);
                onPressClose();
            } else {
                alert('The given feed is not valid.');
            }
        }).finally(() => setAddingUrl(false))
    }

    const closeModal = () => {
        setOpenedQR(false);
        onPressClose();
    }

    return (
        <Modal animationType='fade' visible={visible} transparent={true}>
            <View style={styles.centered}>
                <KeyboardAvoidingView style={styles.container}>
                    { !addingUrl ?
                        <>
                            <Text style={styles.text}>Scan a QR code:</Text>
                            { openedQR ||
                                <TouchableHighlight style={styles.button} onPress={startQRScan}>
                                    <Text>Start scan</Text>
                                </TouchableHighlight>
                            }
                            <TouchableHighlight onPress={closeModal} style={styles.button}>
                                <Text>Cancel</Text>
                            </TouchableHighlight>
                        </>
                        : <Text style={styles.text}>Fetching feed...</Text> 
                    }
                </KeyboardAvoidingView>
            </View>
            { openedQR &&
            <View style={styles.scannerContainer}>
                <BarCodeScanner
                    onBarCodeScanned={codeScanned}
                    style={StyleSheet.absoluteFillObject}
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    />
            </View>
            }
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
    scannerContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#23002D',
        justifyContent: 'flex-end',
        borderStyle: 'solid',
        borderColor: '#EEE',
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: 30,
        marginHorizontal: 15
    }
})