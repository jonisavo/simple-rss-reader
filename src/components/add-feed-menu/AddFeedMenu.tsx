import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';

import ToggleMenuButton from './ToggleMenuButton';
import AddURLButton from './AddURLButton';
import AddQRButton from './AddQRButton';

export default function AddFeedMenu(): JSX.Element {
  const animation = React.useRef(new Animated.Value(0)).current;
  const [open, setOpen] = React.useState(false);

  const toggleMenu = () => {
    Animated.spring(animation, {
      toValue: open ? 0 : 1,
      friction: 8,
      useNativeDriver: true,
    }).start();
    setOpen(!open);
  };

  return (
    <View style={styles.container}>
      <AddQRButton animation={animation} endY={120} />
      <AddURLButton animation={animation} endY={60} />
      <ToggleMenuButton onPress={toggleMenu} animation={animation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 40,
    bottom: 40,
  },
});
