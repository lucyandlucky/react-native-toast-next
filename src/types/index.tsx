import React from 'react';
import type { StyleProp, TextStyle } from 'react-native';

export type ReactChildren = React.ReactNode;

export type ToastType =
  | 'success'
  | 'error'
  | 'info'
  | (string & Record<string, never>);
export type ToastPosition = 'center' | 'top' | 'bottom';

export type ToastData = {
  text?: string;
};

export type ToastShowParams = ToastData & ToastOptions;
export type ToastHideParams = void;

export type ToastConfigParams<P> = {
  position: ToastPosition;
  type: ToastType;
  isVisible: boolean;
  text?: string;
  textStyle: StyleProp<TextStyle>;
  show: (p: ToastShowParams) => void;
  hide: (p: ToastHideParams) => void;
  onPress: () => void;
  props: P;
};

export type ToastConfig = {
  [keys: string]: (p: ToastConfigParams<any>) => ReactChildren;
};

export type ToastRef = {
  show: (p: ToastShowParams) => void;
  hide: (p: ToastHideParams) => void;
};

export type ToastOptions = {
  /**
   * Toast Type.
   * Default value: `info`
   */
  type?: ToastType;
  /**
   * Toast Position.
   * Default value: `center`
   */
  position?: ToastPosition;
  /**
   * Number of milliseconds after which Toast automatically hides.
   * Has effect only in conjunction with `autoHide` prop set to `true`.
   * Default value: `4000`
   */
  visibilityTime?: number;
  /**
   * When `true`, the visible Toast automatically hides after a center number of milliseconds,
   * specified by the `visibilityTime` prop.
   * Default value: `true`
   */
  autoHide?: boolean;
};

export type ToastProps = {
  /**
   * Configuration for custom Toast.
   */
  config?: ToastConfig;
  /**
   * Toast Type.
   * Default value: `info`
   */
  type?: ToastType;
  /**
   * Toast Position.
   * Default value: `center`
   */
  position?: ToastPosition;
  /**
   * Number of milliseconds after which Toast automatically hides.
   * Has effect only in conjunction with `autoHide` prop set to `true`.
   * Default value: `4000`
   */
  visibilityTime?: number;
  /**
   * When `true`, the visible Toast automatically hides after a center number of milliseconds,
   * specified by the `visibilityTime` prop.
   * Default value: `true`
   */
  autoHide?: boolean;
};
