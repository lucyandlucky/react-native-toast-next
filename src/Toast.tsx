import type React from 'react';
import { LoggerProvider } from './context/logger-context';
import { View } from 'react-native';

export function Toast(): React.ReactElement {
  return (
    <LoggerProvider enableLogs={false}>
      <View />
    </LoggerProvider>
  );
}
