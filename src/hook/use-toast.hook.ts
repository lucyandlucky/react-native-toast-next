import React, { useEffect } from 'react';
import { useLogger } from '../context/logger-context';
import { useTimeout } from './use-timeout.hook';

export function useToast() {
  const { log } = useLogger();

  const [isVisible, setIsVisible] = React.useState(false);

  const onAutoHide = React.useCallback(() => {
    setIsVisible(false);
    log('Auto hiding');
  }, [log]);

  const { startTimer, clearTimer } = useTimeout(onAutoHide, 4000);

  const show = () => {
    log('Showing with params');
    setIsVisible(true);
  };

  const hide = () => {
    log('Hiding');
    setIsVisible(false);
    clearTimer();
  };

  useEffect(() => {
    if (isVisible) {
      startTimer();
    } else {
      clearTimer();
    }
  }, [isVisible]);

  return {
    isVisible,
    show,
    hide,
  };
}
