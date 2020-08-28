import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';

import Navigator from './components/Navigator';
import { ChannelProvider } from './components/ChannelContext';

export default function App() {
    const [fontsLoaded] = useFonts({
        'CourierPrime': require('./assets/fonts/CourierPrime-Regular.ttf'),
        'CourierPrime-Bold': require('./assets/fonts/CourierPrime-Bold.ttf'),
        'CourierPrime-Italic': require('./assets/fonts/CourierPrime-Italic.ttf'),
        'SourceSansPro': require('./assets/fonts/SourceSansPro-Regular.ttf')
    });

    if (!fontsLoaded) { return <AppLoading/> }

    return (
        <ChannelProvider>
            <StatusBar style="light" />
            <Navigator/>
        </ChannelProvider>
    );
}
