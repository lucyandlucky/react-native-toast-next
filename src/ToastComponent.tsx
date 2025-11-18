import { Text } from 'react-native';
import type {
  ToastConfig,
  ToastData,
  ToastHideParams,
  ToastOptions,
  ToastShowParams,
} from './types';
import AnimatedContainer from './components/animated-container';

export type ToastComponentProps = {
  isVisible: boolean;
  config?: ToastConfig;
  options: Required<ToastOptions>;
  data: ToastData;
  show: (p: ToastShowParams) => void;
  hide: (p: ToastHideParams) => void;
};

export default function ToastComponent(props: ToastComponentProps) {
  const { isVisible } = props;

  return (
    <AnimatedContainer isVisible={isVisible}>
      <Text>demo</Text>
    </AnimatedContainer>
  );
}
