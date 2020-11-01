import React from 'react';
import { Text, Animated, TouchableWithoutFeedback, StyleSheet } from 'react-native';

export default function AddQRButton(props) {
    const { animation, endY } = props;

    const animatedStyle = {
        transform: [
            { scale: animation },
            { 
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -endY || 0]
                })
            }
        ]
    }

    return (
        <TouchableWithoutFeedback>
            <Animated.View style={[styles.button, animatedStyle]}>
                <Text style={styles.text}>QR</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        width: 48,
        height: 48,
        backgroundColor: '#FFF',
        borderRadius: 48 / 2,
        shadowRadius: 10,
        shadowColor: '#FFAA00',
        shadowOpacity: 0.3,
        shadowOffset: { height: 10 },
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 22,
        color: '#23002D'
    }
});
