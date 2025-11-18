import React from 'react';
import { Animated } from 'react-native';
import type { ReactChildren, ToastPosition } from '../../types';
import { styles } from './styles';

type Props = {
  isVisible: boolean;
  position: ToastPosition;
  children: ReactChildren;
};

export default function AnimatedContainer(props: Props) {
  const { isVisible, children } = props;

  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [0, 1, 1],
  });

  const animate = React.useCallback((toValue: 0 | 1) => {
    Animated.timing(animatedValue, {
      toValue,
      useNativeDriver: true,
      duration: 400,
    }).start();
  }, []);

  React.useLayoutEffect(() => {
    animate(isVisible ? 1 : 0);
  }, [animate, isVisible]);

  return (
    <Animated.View
      style={[styles.container, { opacity }]}
      pointerEvents={'none'}
    >
      {children}
    </Animated.View>
  );
}
