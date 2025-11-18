import React from 'react';
import { useLogger } from '../context/logger-context';

export function useTimeout<CbParams>(cb: (p?: CbParams) => void, delayMs = 0) {
  const { log } = useLogger();

  const timerRef = React.useRef<NodeJS.Timeout>(null);

  const clearTimer = React.useCallback(() => {
    if (timerRef.current) {
      log('Clearing timer', timerRef.current);
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [log]);

  const startTimer = React.useCallback(() => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      cb();
      log('Running timer', timerRef.current);
      clearTimer();
    }, delayMs);
    log('Starting timer', timerRef.current);
  }, [delayMs, clearTimer, cb, log]);

  React.useEffect(() => () => clearTimer(), [clearTimer]);

  return {
    startTimer,
    clearTimer,
    isActive: timerRef.current !== undefined,
  };
}
