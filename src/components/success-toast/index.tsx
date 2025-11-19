import { BaseToast } from '../base-toast';
import type { BaseToastProps } from '../../types';

export function SuccessToast(props: BaseToastProps) {
  return (
    <BaseToast
      {...props}
      style={{ backgroundColor: '#fff' }}
      textStyle={{ color: '#000000' }}
    />
  );
}
