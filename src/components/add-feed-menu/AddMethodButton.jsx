import React from 'react';
import { Animated, TouchableWithoutFeedback, StyleSheet } from 'react-native';

export default function AddMethodButton(props) {
    const { animation, endY, children, onPress } = props;

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
        <TouchableWithoutFeedback onPress={onPress}>
            <Animated.View style={[styles.button, animatedStyle]}>
                { children }
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
    }
});
