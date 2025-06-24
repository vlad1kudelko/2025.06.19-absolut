import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Card, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DeliveryDetailScreen() {
  const { id } = useLocalSearchParams();
  const theme = useTheme();
  const navigation = useNavigation();
  const [delivery, setDelivery] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (!id) return;
    navigation.setOptions({
      title: `Доставка №${id}`,
      headerStyle: { backgroundColor: theme.colors.background },
      headerTintColor: theme.colors.onBackground,
      headerTitleStyle: { color: theme.colors.onBackground },
    });
  }, [navigation, id, theme.colors.background, theme.colors.onBackground]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const token = await AsyncStorage.getItem('jwt');
        if (!token) throw new Error('Нет токена');
        const res = await fetch(`http://192.168.0.9/api/delivery-table/${id}/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Ошибка загрузки');
        const data = await res.json();
        setDelivery(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <ActivityIndicator style={{ marginTop: 32 }} color={theme.colors.primary} />;
  if (error) return <Text style={{ color: theme.colors.error, margin: 24 }}>{error}</Text>;
  if (!delivery) return <Text style={{ margin: 24, color: theme.colors.onBackground }}>Доставка не найдена</Text>;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={{ padding: 16 }}>
      <Card style={{ marginBottom: 16, backgroundColor: theme.colors.elevation.level1 }}>
        <Card.Title title={`Статус: ${delivery.delivery_status?.name || ''}`} titleStyle={{ color: theme.colors.onBackground }} />
        <Card.Content>
          <Text style={{ color: theme.colors.onBackground }}>Услуга: {delivery.service?.name}</Text>
          <Text style={{ color: theme.colors.onBackground }}>Модель транспорта: {delivery.vehicle_model?.model} ({delivery.vehicle_model?.number})</Text>
          <Text style={{ color: theme.colors.onBackground }}>Тип упаковки: {delivery.packaging_type?.name}</Text>
          <Text style={{ color: theme.colors.onBackground }}>Тип груза: {delivery.cargo_type?.name}</Text>
          <Text style={{ color: theme.colors.onBackground }}>Время отправления: {delivery.departure_datetime}</Text>
          <Text style={{ color: theme.colors.onBackground }}>Время прибытия: {delivery.arrival_datetime}</Text>
          <Text style={{ color: theme.colors.onBackground }}>Время в пути: {delivery.transit_time}</Text>
          <Text style={{ color: theme.colors.onBackground }}>Дистанция: {delivery.distance} км</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
} 