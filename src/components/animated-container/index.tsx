import React from 'react';
import { Animated, type ViewStyle } from 'react-native';
import type { ReactChildren, ToastPosition } from '../../types';
import { styles } from './styles';

type Props = {
  isVisible: boolean;
  position: ToastPosition;
  topOffset: number;
  bottomOffset: number;
  children: ReactChildren;
};

export default function AnimatedContainer(props: Props) {
  const { isVisible, children, position, topOffset, bottomOffset } = props;

  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [0, 1, 1],
  });

  const offsetStyle = React.useMemo<ViewStyle>(() => {
    switch (position) {
      case 'top':
        return {
          top: topOffset,
        };
      case 'bottom':
        return {
          bottom: bottomOffset,
        };
      case 'center':
        return {
          top: 0,
        };
      default:
        return {
          top: 0,
        };
    }
  }, [position, topOffset, bottomOffset]);

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
      style={[styles.container, styles[position], offsetStyle, { opacity }]}
      pointerEvents={'none'}
    >
      {children}
    </Animated.View>
  );
}
