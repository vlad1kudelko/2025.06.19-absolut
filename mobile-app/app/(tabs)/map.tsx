import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTheme, Appbar, IconButton } from 'react-native-paper';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MapScreen() {
  const theme = useTheme();
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const t = await AsyncStorage.getItem('jwt');
      setToken(t);
      if (!t) return;
      fetch('http://192.168.0.9/api/delivery-table/', {
        headers: { 'Authorization': `Bearer ${t}` },
      })
        .then(res => res.ok ? res.json() : [])
        .then(setDeliveries)
        .catch(() => setDeliveries([]));
    })();
  }, []);

  // Центр карты по первой доставке, иначе Москва
  let initialRegion = {
    latitude: 55.751244,
    longitude: 37.618423,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };
  if (deliveries.length > 0 && deliveries[0].from_coords) {
    const [lat, lon] = deliveries[0].from_coords.split(',').map(Number);
    if (!isNaN(lat) && !isNaN(lon)) {
      initialRegion.latitude = lat;
      initialRegion.longitude = lon;
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Appbar.Header style={{ backgroundColor: theme.colors.background, elevation: 0, shadowOpacity: 0 }}>
        <Appbar.Content title="Карта" titleStyle={{ color: theme.colors.onBackground }} />
        <IconButton icon="plus" onPress={() => {}} accessibilityLabel="Создать" size={24} iconColor={theme.colors.onBackground} />
      </Appbar.Header>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
      >
        {deliveries.map(delivery => {
          const from = delivery.from_coords ? delivery.from_coords.split(',').map(Number) : null;
          const to = delivery.to_coords ? delivery.to_coords.split(',').map(Number) : null;
          return [
            from && !isNaN(from[0]) && !isNaN(from[1]) ? (
              <Marker
                key={`from-${delivery.id}`}
                coordinate={{ latitude: from[0], longitude: from[1] }}
                title={`Откуда: №${delivery.id}`}
                description={delivery.vehicle_model ? `${delivery.vehicle_model.model} (${delivery.vehicle_model.number})` : ''}
                pinColor="green"
              />
            ) : null,
            to && !isNaN(to[0]) && !isNaN(to[1]) ? (
              <Marker
                key={`to-${delivery.id}`}
                coordinate={{ latitude: to[0], longitude: to[1] }}
                title={`Куда: №${delivery.id}`}
                description={delivery.vehicle_model ? `${delivery.vehicle_model.model} (${delivery.vehicle_model.number})` : ''}
                pinColor="red"
              />
            ) : null,
            from && to && !isNaN(from[0]) && !isNaN(from[1]) && !isNaN(to[0]) && !isNaN(to[1]) ? (
              <Polyline
                key={`line-${delivery.id}`}
                coordinates={[
                  { latitude: from[0], longitude: from[1] },
                  { latitude: to[0], longitude: to[1] }
                ]}
                strokeColor="#007bff"
                strokeWidth={3}
              />
            ) : null,
          ];
        })}
      </MapView>
    </View>
  );
} 