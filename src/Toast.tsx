import React from 'react';
import { LoggerProvider } from './context/logger-context';
import { View } from 'react-native';
import type { ToastRef, ToastProps } from './types';

const ToastRoot = React.forwardRef<ToastRef, ToastProps>((_props, ref) => {
  React.useImperativeHandle(ref, () => ({
    show() {},
    hide() {},
  }));

  return <View />;
});

type ToastRefObj = {
  current: ToastRef | null;
};

let refs: ToastRefObj[] = [];

/**
 * Adds a ref to the end of refs array
 * @param newRef
 */
function addNewRef(newRef: ToastRef) {
  refs.push({ current: newRef });
  console.log('refs', refs);
}

/**
 * Removes the passed-in ref from the file-level refs array
 * @param oldRef
 */
function removeOldRef(oldRef: ToastRef | null) {
  refs = refs.filter((r) => r.current !== oldRef);
}

export function Toast(props: ToastProps): React.ReactElement {
  const toastRef = React.useRef<ToastRef | null>(null);

  const setRef = React.useCallback((ref: ToastRef | null) => {
    if (ref) {
      toastRef.current = ref;
      addNewRef(ref);
    } else {
      removeOldRef(toastRef.current);
    }
  }, []);

  return (
    <LoggerProvider enableLogs={false}>
      <ToastRoot ref={setRef} {...props} />
    </LoggerProvider>
  );
}
