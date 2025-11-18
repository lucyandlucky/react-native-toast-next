import React from 'react';
import { LoggerProvider } from './context/logger-context';
import type { ToastRef, ToastProps, ToastShowParams } from './types';
import ToastComponent from './ToastComponent';
import { useToast } from './hook';

const ToastRoot = React.forwardRef<ToastRef, ToastProps>((props, ref) => {
  const { config, ...defaultOptions } = props;
  const { isVisible, show, hide } = useToast({ defaultOptions });

  React.useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  return (
    <ToastComponent
      isVisible={isVisible}
      show={show}
      hide={hide}
      options={{}}
    />
  );
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
    <LoggerProvider enableLogs={true}>
      <ToastRoot ref={setRef} {...props} />
    </LoggerProvider>
  );
}

Toast.show = (p: ToastShowParams) => {
  getRef()?.show(p);
};

Toast.hide = () => {
  getRef()?.hide();
};
