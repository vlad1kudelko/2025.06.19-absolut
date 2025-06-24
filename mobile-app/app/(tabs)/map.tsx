import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function MapScreen() {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.onBackground }}>Карта</Text>
    </View>
  );
} 