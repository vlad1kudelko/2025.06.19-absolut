import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
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