import { GestureResponderEvent, Animated } from 'react-native';

export type ModalProps = {
  visible: boolean;
  onPressClose: (event?: GestureResponderEvent) => void;
};

export type ButtonProps = {
  animation: Animated.Value;
  endY: number;
};
