import React from 'react';
import { Text, View, Animated, StyleSheet } from 'react-native';
import ToggleMenuButton from './ToggleMenuButton';
import AddMethodButton from './AddMethodButton';

export default function AddFeedMenu() {
    const animation = React.useRef(new Animated.Value(0)).current;
    const [open, setOpen] = React.useState(false);

    const toggleMenu = () => {
        Animated.spring(animation, {
            toValue: open ? 0 : 1,
            friction: 8,
            useNativeDriver: true
        }).start();
        setOpen(!open);
    }

    return (
        <View style={styles.container}>
            <AddMethodButton animation={animation} endY={120}>
                <Text style={styles.text}>QR</Text>
            </AddMethodButton>
            <AddMethodButton animation={animation} endY={60}>
                <Text style={styles.text}>URL</Text>
            </AddMethodButton>
            <ToggleMenuButton onPress={toggleMenu} animation={animation} />
        </View>
    ) 
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 40,
        bottom: 40
    },
    text: {
        fontSize: 22,
        color: '#23002D'
    }
});
