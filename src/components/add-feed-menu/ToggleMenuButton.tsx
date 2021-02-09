import React from 'react';
import {
  Text,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

type Props = {
  animation: Animated.Value;
  onPress: (event: GestureResponderEvent) => void;
};

export default function ToggleMenuButton(props: Props): JSX.Element {
  const { animation, onPress } = props;

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }),
      },
    ],
  };
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={[styles.button, rotation]}>
        <Text style={styles.text}>+</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#FFAA00',
    borderRadius: 60 / 2,
    shadowRadius: 10,
    shadowColor: '#FFAA00',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 28,
    color: '#28002D',
  },
});
