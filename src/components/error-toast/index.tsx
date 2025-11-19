import { BaseToast } from '../base-toast';
import type { BaseToastProps } from '../../types';

export function ErrorToast(props: BaseToastProps) {
  return (
    <BaseToast
      {...props}
      style={{ backgroundColor: '#FFEEEB', borderColor: '#F24223' }}
      textStyle={{ color: '#000000' }}
    />
  );
}
