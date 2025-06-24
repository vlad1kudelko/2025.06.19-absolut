import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Card, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import duration from 'dayjs/plugin/duration';
dayjs.locale('ru');
dayjs.extend(duration);

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
      return `сегодня в ${d.format('HH:mm')}`;
    }
    if (d.isSame(now.subtract(1, 'day'), 'day')) {
      return `вчера в ${d.format('HH:mm')}`;
    }
    return d.format('DD.MM.YYYY в HH:mm');
  }

  function formatDurationStr(durationStr: string) {
    if (!durationStr) return '';
    // Ожидаем формат 'HH:mm:ss' или 'H:mm:ss'
    const parts = durationStr.split(':');
    if (parts.length === 3) {
      const [h, m, s] = parts;
      const hours = parseInt(h, 10);
      const minutes = parseInt(m, 10);
      let res = '';
      if (hours > 0) res += `${hours} ч`;
      if (minutes > 0) res += (res ? ' ' : '') + `${minutes} м`;
      if (!res) res = 'меньше минуты';
      return res;
    }
    // Если не стандартный формат, просто вернуть исходное
    return durationStr;
  }

  // Функция для затемнения цвета (hex) на заданный процент
  function darkenColor(hex: string, percent: number) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
    const num = parseInt(c, 16);
    let r = (num >> 16) - Math.round(2.55 * percent);
    let g = ((num >> 8) & 0x00FF) - Math.round(2.55 * percent);
    let b = (num & 0x0000FF) - Math.round(2.55 * percent);
    r = Math.max(0, r);
    g = Math.max(0, g);
    b = Math.max(0, b);
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={{ padding: 16 }}>
      {/* Группа 1: Модель транспорта */}
      <View style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.outlineVariant, paddingVertical: 12 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="truck" size={22} color={theme.colors.onBackground} style={{ marginRight: 20 }} />
            <Text style={{ color: theme.colors.onBackground, fontSize: 20, fontWeight: 'bold' }}>Модель и номер</Text>
          </View>
          <Text style={{ color: theme.colors.onBackground, fontSize: 18}}>
            {delivery.vehicle_model ? `${delivery.vehicle_model.model} (${delivery.vehicle_model.number})` : ''}
          </Text>
        </View>
      </View>
      {/* Группа 2: Время в пути + отправка/доставка */}
      <View style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.outlineVariant, paddingVertical: 12, flexDirection: 'row' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 16 }}>
          <MaterialCommunityIcons name="clock-outline" size={28} color={theme.colors.onBackground} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {/* Время в пути */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
            <Text style={{ color: theme.colors.onBackground, fontSize: 15, fontWeight: 'bold' }}>Время в пути</Text>
            <Text style={{ color: theme.colors.onBackground, fontSize: 17 }}>{formatDurationStr(delivery.transit_time)}</Text>
          </View>
          {/* Отправка */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
            <Text style={{ color: theme.colors.onBackground, fontSize: 15, fontWeight: 'bold', opacity: 0.6 }}>Отправка</Text>
            <Text style={{ color: theme.colors.onBackground, fontSize: 13, opacity: 0.6 }}>{formatDateTime(delivery.departure_datetime)}</Text>
          </View>
          {/* Доставка */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: theme.colors.onBackground, fontSize: 15, fontWeight: 'bold', opacity: 0.6 }}>Доставка</Text>
            <Text style={{ color: theme.colors.onBackground, fontSize: 13, opacity: 0.6 }}>{formatDateTime(delivery.arrival_datetime)}</Text>
          </View>
        </View>
      </View>
      {/* Группа 3: Дистанция, откуда, куда */}
      <View style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.outlineVariant, paddingVertical: 12, flexDirection: 'row' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 16 }}>
          <MaterialCommunityIcons name="map-marker-distance" size={28} color={theme.colors.onBackground} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {/* Дистанция */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
            <Text style={{ color: theme.colors.onBackground, fontSize: 15, fontWeight: 'bold' }}>Дистанция</Text>
            <Text style={{ color: theme.colors.onBackground, fontSize: 17 }}>{delivery.distance ? `${delivery.distance} км` : ''}</Text>
          </View>
          {/* Откуда */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
            <Text style={{ color: theme.colors.onBackground, fontSize: 15, fontWeight: 'bold', opacity: 0.6 }}>Откуда</Text>
            <Text style={{ color: theme.colors.onBackground, fontSize: 13, opacity: 0.6 }}>{delivery.from_coords || ''}</Text>
          </View>
          {/* Куда */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: theme.colors.onBackground, fontSize: 15, fontWeight: 'bold', opacity: 0.6 }}>Куда</Text>
            <Text style={{ color: theme.colors.onBackground, fontSize: 13, opacity: 0.6 }}>{delivery.to_coords || ''}</Text>
          </View>
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
          <Text style={{
            backgroundColor: delivery.delivery_status_color || theme.colors.primary,
            color: darkenColor(delivery.delivery_status_color || theme.colors.primary, 50),
            borderRadius: 12,
            paddingHorizontal: 10,
            paddingVertical: 2,
            fontSize: 14,
            fontWeight: 'bold',
            overflow: 'hidden',
            alignSelf: 'flex-start',
          }}>
            {delivery.delivery_status?.name}
          </Text>
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
