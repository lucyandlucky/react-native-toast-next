import React from 'react';
import type {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextProps,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

export type ReactChildren = React.ReactNode;

export type ToastType = 'success' | 'error' | 'info' | (string & {});
export type ToastPosition = 'center' | 'top' | 'bottom';

export type ToastData = {
  text?: string;
};

export type ToastShowParams = ToastData & ToastOptions;
export type ToastHideParams = void;

export type BaseToastProps = {
  text?: string;
  style?: StyleProp<ViewStyle>;
  touchContainerProps?: TouchableOpacityProps;
  textStyle?: StyleProp<TextStyle>;
  textProps?: TextProps;
  activeOpacity?: number;
  leadingIcon?: ImageSourcePropType;
  leadingIconStyle?: StyleProp<ImageStyle>;
  trailingIcon?: ImageSourcePropType;
  trailingStyle?: StyleProp<ImageStyle>;
  onPress?: () => void;
  renderLeadingIcon?: () => ReactChildren;
  renderTrailingIcon?: () => ReactChildren;
};

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
   * Default value: `3000`
   */
  visibilityTime?: number;
  /**
   * When `true`, the visible Toast automatically hides after a center number of milliseconds,
   * specified by the `visibilityTime` prop.
   * Default value: `true`
   */
  autoHide?: boolean;
  /**
   * Style for Toast text
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * Any custom props passed to specified Toast Type.
   * Has effect only when there is a custom Toast Type (configured via `config` prop on the Toast instance)
   * that uses `props` parameter
   */
  props?: any;
  /**
   * Called on Toast press
   */
  onPress?: () => void;
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
   * Default value: `3000`
   */
  visibilityTime?: number;
  /**
   * When `true`, the visible Toast automatically hides after a center number of milliseconds,
   * specified by the `visibilityTime` prop.
   * Default value: `true`
   */
  autoHide?: boolean;
};
