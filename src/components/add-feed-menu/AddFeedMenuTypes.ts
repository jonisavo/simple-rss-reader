import { Animated } from 'react-native';

export type ModalProps = {
  visible: boolean;
  onPressClose: Function;
};

export type ButtonProps = {
  animation: Animated.Value;
  endY: number;
};
