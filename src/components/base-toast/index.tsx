import { Text, View } from 'react-native';
import { styles } from './style';
import type { BaseToastProps } from '../../types';

export default function BaseToast(props: BaseToastProps) {
  console.log('props -->', props);
  const { text } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text} allowFontScaling={false}>
        {text}
      </Text>
    </View>
  );
}
