import React from 'react';
import type { ReactChildren } from '../types';
import { noop } from '../utils/func';

export type LoggerContextType = {
  log: (...arg: unknown[]) => void;
};

export type LoggerProviderProps = {
  children: ReactChildren;
  enableLogs?: boolean;
};

const LoggerContext = React.createContext<LoggerContextType>({
  log: noop,
});

function LoggerProvider(props: LoggerProviderProps) {
  const { children, enableLogs } = props;

  const log = React.useCallback(
    (...args: unknown[]) => {
      if (enableLogs) {
        console.log('Toast:', ...args);
      }
    },
    [enableLogs]
  );

  const value = { log };

  return (
    <LoggerContext.Provider value={value}>{children}</LoggerContext.Provider>
  );
}

function useLogger() {
  const ctx = React.useContext(LoggerContext);
  return ctx;
}

export { LoggerProvider, useLogger };
