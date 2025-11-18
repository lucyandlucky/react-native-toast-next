import type {
  ToastConfig,
  ToastData,
  ToastHideParams,
  ToastOptions,
  ToastShowParams,
} from './types';
import AnimatedContainer from './components/animated-container';
import BaseToast from './components/base-toast';

export type ToastComponentProps = {
  isVisible: boolean;
  config?: ToastConfig;
  options: Required<ToastOptions>;
  data: ToastData;
  show: (p: ToastShowParams) => void;
  hide: (p: ToastHideParams) => void;
};

export default function ToastComponent(props: ToastComponentProps) {
  const { isVisible, options } = props;
  const { position } = options;

  return (
    <AnimatedContainer isVisible={isVisible} position={position}>
      <BaseToast />
    </AnimatedContainer>
  );
}
