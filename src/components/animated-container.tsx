import React from 'react';
import { Animated, Text } from 'react-native';
import type { ReactChildren } from '../types';

type Props = {
  isVisible: boolean;
  children: ReactChildren;
};

export default function AnimatedContainer(props: Props) {
  const { isVisible } = props;

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
    <Animated.View style={[{ opacity }]}>
      <Text>demo</Text>
    </Animated.View>
  );
}
