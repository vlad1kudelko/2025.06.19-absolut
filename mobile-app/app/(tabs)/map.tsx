import { View } from 'react-native';
import { useTheme, Appbar, IconButton } from 'react-native-paper';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useState } from 'react';

export default function MapScreen() {
  const theme = useTheme();
  // Пример массива точек (можно будет получать из API)
  const [points] = useState([
    { id: 1, title: 'Точка 1', description: 'Описание 1', coordinate: { latitude: 55.751244, longitude: 37.618423 } },
    { id: 2, title: 'Точка 2', description: 'Описание 2', coordinate: { latitude: 55.761244, longitude: 37.628423 } },
  ]);
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Appbar.Header style={{ backgroundColor: theme.colors.background, elevation: 0, shadowOpacity: 0 }}>
        <Appbar.Content title="Карта" titleStyle={{ color: theme.colors.onBackground }} />
        <IconButton icon="plus" onPress={() => {}} accessibilityLabel="Создать" size={24} iconColor={theme.colors.onBackground} />
      </Appbar.Header>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 55.751244,
          longitude: 37.618423,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {points.map(point => (
          <Marker
            key={point.id}
            coordinate={point.coordinate}
            title={point.title}
            description={point.description}
          />
        ))}
      </MapView>
    </View>
  );
} 