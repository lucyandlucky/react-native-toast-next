import { Text, View } from 'react-native';
import { styles } from './style';

export default function BaseToast() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>demo</Text>
    </View>
  );
}
