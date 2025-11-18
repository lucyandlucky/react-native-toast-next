import React, { useEffect } from 'react';
import { useLogger } from '../context/logger-context';
import { useTimeout } from './use-timeout.hook';
import type {
  ToastData,
  ToastOptions,
  ToastProps,
  ToastShowParams,
} from '../types';
import { mergeIfDefined } from '../utils/obj';

export const DEFAULT_DATA: ToastData = {
  text: undefined,
};

const DEFAULT_OPTION: Required<ToastOptions> = {
  type: 'info',
  position: 'center',
  visibilityTime: 4000,
  autoHide: true,
};

export type UseToastParams = {
  defaultOptions: Omit<ToastProps, 'config'>;
};

export function useToast(o: UseToastParams) {
  const { defaultOptions } = o;

  const initialOption = mergeIfDefined(
    DEFAULT_OPTION,
    defaultOptions
  ) as Required<ToastOptions>;
  const { log } = useLogger();
  const [isVisible, setIsVisible] = React.useState(false);
  const [options, setOptions] = React.useState(initialOption);
  const [data, setData] = React.useState(DEFAULT_DATA);

  const onAutoHide = React.useCallback(() => {
    setIsVisible(false);
    log('Auto hiding');
  }, [log]);

  const { startTimer, clearTimer } = useTimeout(onAutoHide, 4000);

  const show = React.useCallback(
    (params: ToastShowParams) => {
      log('Showing with params', params);
      const {
        text = DEFAULT_DATA.text,
        type = initialOption.type,
        position = initialOption.position,
        visibilityTime = initialOption.visibilityTime,
        autoHide = initialOption.autoHide,
      } = params;

      setData({ text });
      setOptions(
        mergeIfDefined(initialOption, {
          type,
          position,
          visibilityTime,
          autoHide,
        }) as Required<ToastOptions>
      );
      setIsVisible(true);
    },
    [initialOption]
  );
  // const show = () => {
  //   log('Showing with params');
  //   setIsVisible(true);
  // };

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
    options,
    data,
    show,
    hide,
  };
}
