import {
  Image,
  Text,
  TouchableOpacity,
  type ImageSourcePropType,
  type ImageStyle,
  type StyleProp,
} from 'react-native';
import { styles } from './style';
import type { BaseToastProps, ReactChildren } from '../../types';
import { noop } from '../../utils/func';

function renderIcon(o: {
  icon?: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
  renderFn?: () => ReactChildren;
}) {
  const { icon, renderFn } = o;

  if (renderFn && typeof renderFn === 'function') {
    return renderFn();
  }
  if (icon) {
    return <Image source={icon} />;
  }
  return null;
}

export function BaseToast(props: BaseToastProps) {
  const {
    text,
    style,
    touchContainerProps,
    textStyle,
    textProps,
    activeOpacity = 1,
    leadingIcon,
    leadingIconStyle,
    trailingIcon,
    trailingStyle,
    onPress = noop,
    renderLeadingIcon,
    renderTrailingIcon,
  } = props;

  console.log('leadingIcon --.', leadingIcon);
  return (
    <TouchableOpacity
      style={[styles.base, style]}
      activeOpacity={activeOpacity}
      onPress={onPress}
      {...touchContainerProps}
    >
      {renderIcon({
        icon: leadingIcon,
        iconStyle: [styles.leadingIcon, leadingIconStyle],
        renderFn: renderLeadingIcon,
      })}
      <Text
        style={[styles.text, textStyle]}
        allowFontScaling={false}
        numberOfLines={0}
        {...textProps}
      >
        {text}
      </Text>
      {renderIcon({
        icon: trailingIcon,
        iconStyle: [styles.trailingIcon, trailingStyle],
        renderFn: renderTrailingIcon,
      })}
    </TouchableOpacity>
  );
}
