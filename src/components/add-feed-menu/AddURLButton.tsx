import React from 'react';
import {
  Text,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

import AddFeedURLModal from './AddFeedURLModal';
import type { ButtonProps } from './AddFeedMenuTypes';

export default function AddURLButton(props: ButtonProps): JSX.Element {
  const { animation, endY } = props;

  const [modalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => setModalVisible(!modalVisible);

  const animatedStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -endY || 0],
        }),
      },
    ],
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={toggleModal}>
        <Animated.View style={[styles.button, animatedStyle]}>
          <Text style={styles.text}>URL</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      <AddFeedURLModal visible={modalVisible} onPressClose={toggleModal} />
    </>
  );
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
    shadowOffset: { width: 0, height: 10 },
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 22,
    color: '#23002D',
  },
});
