import React, { useRef } from 'react';
import { Text, Animated } from 'react-native';
import type { ToastHideParams, ToastShowParams } from './types';

export type ToastComponentProps = {
  isVisible: boolean;
  options: any;
  show: (p: ToastShowParams) => void;
  hide: (p: ToastHideParams) => void;
};

export default function ToastComponent(props: ToastComponentProps) {
  const { isVisible } = props;

  const animatedValue = useRef(new Animated.Value(0)).current;
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
    <Animated.View style={[{ opacity: opacity }]}>
      <Text>Demo</Text>
    </Animated.View>
  );
}
