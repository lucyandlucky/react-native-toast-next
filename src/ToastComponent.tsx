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

function renderComponent({
  config,
  data,
  options,
  show,
  hide,
}: ToastComponentProps) {
  const { text } = data;
  const { type } = options;
  const Component = defaultToastConfig[type];

  console.log('config', config);

  if (!Component) {
    // TODO: throw err
    return null;
  }

  return Component({
    text,
    textStyle: {},
    position: 'bottom',
    type,
    props: {
      demo: 'demo',
    },
    isVisible: true,
    onPress() {},
    show,
    hide,
  });
}

export default function ToastComponent(props: ToastComponentProps) {
  const { isVisible, options } = props;
  const { position } = options;

  return (
    <AnimatedContainer isVisible={isVisible} position={position}>
      {renderComponent(props)}
    </AnimatedContainer>
  );
}
