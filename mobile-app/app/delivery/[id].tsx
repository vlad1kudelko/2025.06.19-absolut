import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Card, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');

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

  // Форматирование дат
  function formatDateTime(dt: string) {
    if (!dt) return '';
    const d = dayjs(dt);
    const now = dayjs();
    if (d.isSame(now, 'day')) {
      return `сегодня ${d.format('HH:mm')}`;
    }
    return d.format('DD.MM.YYYY HH:mm');
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={{ padding: 16 }}>
      {/* Группа 1: Модель транспорта */}
      <View style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.outlineVariant, paddingVertical: 12 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: theme.colors.onBackground, fontSize: 20, fontWeight: 'bold' }}>Модель и номер</Text>
          <Text style={{ color: theme.colors.onBackground, fontSize: 18}}>
            {delivery.vehicle_model ? `${delivery.vehicle_model.model} (${delivery.vehicle_model.number})` : ''}
          </Text>
        </View>
      </View>
      {/* Группа 2: Время в пути + отправка/доставка */}
      <View style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.outlineVariant, paddingVertical: 12 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: theme.colors.onBackground, fontSize: 20, fontWeight: 'bold' }}>Время в пути</Text>
          <Text style={{ color: theme.colors.onBackground, fontSize: 18, marginBottom: 4 }}>
            {delivery.transit_time ? delivery.transit_time : ''}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: theme.colors.onBackground, fontSize: 15, opacity: 0.6 }}>Отправка</Text>
            <Text style={{ color: theme.colors.onBackground, fontSize: 13, opacity: 0.6 }}>
              Отправка: {formatDateTime(delivery.departure_datetime)}
            </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: theme.colors.onBackground, fontSize: 15, opacity: 0.6 }}>Доставка</Text>
            <Text style={{ color: theme.colors.onBackground, fontSize: 13, opacity: 0.6, textAlign: 'right' }}>
              Доставка: {formatDateTime(delivery.arrival_datetime)}
            </Text>
        </View>
      </View>
      {/* Дистанция */}
      <View style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.outlineVariant, paddingVertical: 12 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: theme.colors.onBackground, fontSize: 15, fontWeight: 'bold' }}>Дистанция</Text>
          <Text style={{ color: theme.colors.onBackground, fontSize: 17, marginLeft: 16, flexShrink: 1, textAlign: 'right' }}>{delivery.distance ? `${delivery.distance} км` : ''}</Text>
        </View>
      </View>
      {/* Услуга */}
      <View style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.outlineVariant, paddingVertical: 12 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: theme.colors.onBackground, fontSize: 15, fontWeight: 'bold' }}>Услуга</Text>
          <Text style={{ color: theme.colors.onBackground, fontSize: 17, marginLeft: 16, flexShrink: 1, textAlign: 'right' }}>{delivery.service?.name}</Text>
        </View>
      </View>
      {/* Статус */}
      <View style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.outlineVariant, paddingVertical: 12 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: theme.colors.onBackground, fontSize: 15, fontWeight: 'bold' }}>Статус</Text>
          <Text style={{ color: theme.colors.onBackground, fontSize: 17, marginLeft: 16, flexShrink: 1, textAlign: 'right' }}>{delivery.delivery_status?.name}</Text>
        </View>
      </View>
      {/* Упаковка */}
      <View style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.outlineVariant, paddingVertical: 12 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: theme.colors.onBackground, fontSize: 15, fontWeight: 'bold' }}>Упаковка</Text>
          <Text style={{ color: theme.colors.onBackground, fontSize: 17, marginLeft: 16, flexShrink: 1, textAlign: 'right' }}>{delivery.packaging_type?.name}</Text>
        </View>
      </View>
      {/* Тип документа */}
      <View style={{ paddingVertical: 12 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: theme.colors.onBackground, fontSize: 15, fontWeight: 'bold' }}>Тип документа</Text>
          <Text style={{ color: theme.colors.onBackground, fontSize: 17, marginLeft: 16, flexShrink: 1, textAlign: 'right' }}>{delivery.cargo_type?.name}</Text>
        </View>
      </View>
    </ScrollView>
  );
} 
