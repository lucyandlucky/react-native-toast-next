import React, { useRef } from 'react';
import { LoggerProvider } from './context/logger-context';
import type { ToastRef, ToastProps } from './types';
import ToastComponent from './ToastComponent';

const ToastRoot = React.forwardRef<ToastRef, ToastProps>((_props, ref) => {
  const timer = useRef<NodeJS.Timeout>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  const show = () => {
    setIsVisible(true);
    timer.current = setTimeout(() => {
      hide();
    }, 3000);
  };

  const hide = () => {
    setIsVisible(false);
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  React.useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  return <ToastComponent isVisible={isVisible} show={show} hide={hide} />;
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
}

/**
 * Removes the passed-in ref from the file-level refs array
 * @param oldRef
 */
function removeOldRef(oldRef: ToastRef | null) {
  refs = refs.filter((r) => r.current !== oldRef);
}

/**
 * Get the active Toast instance `ref` by priority.
 */
function getRef(): ToastRef | null {
  const reverseRefs = [...refs].reverse();
  const activeRef = reverseRefs.find((r) => r.current !== null);
  if (!activeRef) {
    return null;
  }
  return activeRef.current;
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

Toast.show = () => {
  getRef()?.show();
};

Toast.hide = () => {
  getRef()?.hide();
};
