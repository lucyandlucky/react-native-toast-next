import type {
  ToastConfig,
  ToastData,
  ToastHideParams,
  ToastOptions,
  ToastShowParams,
} from './types';
import AnimatedContainer from './components/animated-container';
import { BaseToast } from './components/base-toast';

const defaultToastConfig: ToastConfig = {
  info: (props) => <BaseToast {...props} />,
};

export type ToastComponentProps = {
  isVisible: boolean;
  config?: ToastConfig;
  options: Required<ToastOptions>;
  data: ToastData;
  show: (p: ToastShowParams) => void;
  hide: (p: ToastHideParams) => void;
};

function RenderComponent({
  config,
  isVisible,
  data,
  options,
  show,
  hide,
}: ToastComponentProps) {
  const { text } = data;
  const { type, props, position, textStyle, onPress } = options;

  const toastConfig = {
    ...defaultToastConfig,
    ...config,
  };

  const Component = toastConfig[type];

  if (!Component) {
    // TODO: throw err
    return null;
  }

  return Component({
    text,
    textStyle,
    position,
    type,
    props,
    isVisible,
    onPress,
    show,
    hide,
  });
}

export default function ToastComponent(props: ToastComponentProps) {
  const { isVisible, options } = props;
  const { position } = options;

  return (
    <AnimatedContainer isVisible={isVisible} position={position}>
      {RenderComponent(props)}
    </AnimatedContainer>
  );
}
