import React from 'react';
import type { ToastProps, ToastRef } from './types';
import { View } from 'react-native';

export const ToastRoot = React.forwardRef<ToastRef, ToastProps>(
  (_props, ref) => {
    React.useImperativeHandle(ref, () => ({
      show() {},
      hide() {},
    }));

    return <View />;
  }
);
