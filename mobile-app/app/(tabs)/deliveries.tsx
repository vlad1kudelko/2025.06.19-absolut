import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Card, Text, useTheme, Appbar, IconButton, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/ru';
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale('ru');

type Delivery = {
  id: number;
  delivery_date: string;
  vehicle_model: { model: string; number: string };
  service: string | { id: number; name: string };
  distance: number;
  created_at?: string;
  packaging_type: string | { id: number; name: string };
  delivery_status: string | { id: number; name: string };
  delivery_status_color?: string;
  cargo_type?: string | { id: number; name: string };
};

function LoginScreen({ onLogin }: { onLogin: (token: string) => void }) {
  const theme = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://192.168.0.9/api/auth/login2/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error('Ошибка авторизации');
      const data = await res.json();
      if (!data.access) throw new Error('Нет токена');
      await AsyncStorage.setItem('jwt', data.access);
      onLogin(data.access);
    } catch (e: any) {
      setError(e.message || 'Ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', padding: 24, backgroundColor: theme.colors.background }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={{ color: theme.colors.onBackground, fontSize: 24, marginBottom: 24, textAlign: 'center' }}>Вход</Text>
      <TextInput
        placeholder="Логин"
        value={username}
        onChangeText={setUsername}
        style={{ backgroundColor: theme.colors.elevation.level1, color: theme.colors.onBackground, borderRadius: 8, marginBottom: 12, padding: 12 }}
        placeholderTextColor={theme.colors.onBackground}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        style={{ backgroundColor: theme.colors.elevation.level1, color: theme.colors.onBackground, borderRadius: 8, marginBottom: 12, padding: 12 }}
        placeholderTextColor={theme.colors.onBackground}
        secureTextEntry
      />
      {error && <Text style={{ color: 'red', marginBottom: 12, textAlign: 'center' }}>{error}</Text>}
      <Button mode="contained" onPress={handleLogin} loading={loading} disabled={loading} style={{ marginTop: 8 }}>
        Войти
      </Button>
    </KeyboardAvoidingView>
  );
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

export default function DeliveriesScreen() {
  const theme = useTheme();
  const [filter, setFilter] = useState('time');
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Проверка токена при запуске
  useEffect(() => {
    (async () => {
      const t = await AsyncStorage.getItem('jwt');
      if (!t) {
        setAuthChecked(true);
        return;
      }
      // Проверяем токен (например, делаем тестовый запрос)
      fetch('http://192.168.0.9/api/delivery-table/', {
        headers: { 'Authorization': `Bearer ${t}` },
      })
        .then(res => {
          if (res.status === 401) throw new Error('bad');
          setToken(t);
        })
        .catch(() => setToken(null))
        .finally(() => setAuthChecked(true));
    })();
  }, []);

  // Загрузка доставок
  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(null);
    fetch('http://192.168.0.9/api/delivery-table/', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('Ошибка загрузки');
        return res.json();
      })
      .then(setDeliveries)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (!authChecked) return null;
  if (!token) return <LoginScreen onLogin={setToken} />;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <Appbar.Header style={{ backgroundColor: theme.colors.background, elevation: 0, shadowOpacity: 0 }}>
        <Appbar.Content title="Доставка" titleStyle={{ color: theme.colors.onBackground }} />
        <IconButton icon="filter-variant" onPress={() => {}} accessibilityLabel="Фильтр" size={24} iconColor={theme.colors.onBackground} />
        <IconButton icon="magnify" onPress={() => {}} accessibilityLabel="Поиск" size={24} iconColor={theme.colors.onBackground} />
      </Appbar.Header>
      <View style={styles.filters}>
        <TouchableOpacity
          style={[styles.customBtn, filter === 'time' && styles.customBtnActive, { borderColor: theme.colors.outlineVariant }]}
          onPress={() => setFilter('time')}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="clock-outline" size={18} color={theme.colors.onBackground} />
          <Text style={[styles.customBtnText, { color: theme.colors.onBackground }]}>Все время пути</Text>
          <MaterialCommunityIcons name="menu-down" size={20} color={theme.colors.onBackground} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.customBtn, filter === 'distance' && styles.customBtnActive, { borderColor: theme.colors.outlineVariant }]}
          onPress={() => setFilter('distance')}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="truck" size={18} color={theme.colors.onBackground} />
          <Text style={[styles.customBtnText, { color: theme.colors.onBackground }]}>Все дистанции</Text>
          <MaterialCommunityIcons name="menu-down" size={20} color={theme.colors.onBackground} />
        </TouchableOpacity>
      </View>
      {loading && <Text style={{ color: theme.colors.onBackground, textAlign: 'center', marginTop: 16 }}>Загрузка...</Text>}
      {error && <Text style={{ color: 'red', textAlign: 'center', marginTop: 16 }}>{error}</Text>}
      <FlatList
        data={deliveries}
        keyExtractor={(_, idx) => String(idx)}
        renderItem={({ item }) => {
          const dateStr = item.created_at || item.delivery_date;
          const now = dayjs();
          const created = dayjs(dateStr);
          const diffDays = now.diff(created, 'day');
          const totalHours = now.diff(created, 'hour');
          const diffHours = totalHours - diffDays * 24;
          function plural(num: number, one: string, few: string, many: string) {
            if (num % 10 === 1 && num % 100 !== 11) return one;
            if ([2,3,4].includes(num % 10) && ![12,13,14].includes(num % 100)) return few;
            return many;
          }
          let timeAgo = '';
          if (diffDays > 0) {
            timeAgo += `${diffDays} ${plural(diffDays, 'день', 'дня', 'дней')}`;
          }
          if (diffHours > 0) {
            if (timeAgo) timeAgo += ' ';
            timeAgo += `${diffHours} ${plural(diffHours, 'час', 'часа', 'часов')}`;
          }
          if (!timeAgo) timeAgo = 'только что';
          else timeAgo += ' назад';
          return (
            <View style={[styles.card, { backgroundColor: theme.colors.background, borderBottomColor: theme.colors.outlineVariant }]}> 
              <Text variant="titleMedium" style={{ color: theme.colors.onBackground }}>Доставка №{item.id}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <MaterialCommunityIcons name="clock-outline" size={18} color={theme.colors.onBackground} style={{ marginRight: 4 }} />
                <Text variant="bodyMedium" style={[styles.info, { color: theme.colors.onBackground }]}>{timeAgo}</Text>
                <MaterialCommunityIcons name="truck" size={18} color={theme.colors.onBackground} style={{ marginLeft: 8, marginRight: 4 }} />
                <Text variant="bodyMedium" style={[styles.info, { color: theme.colors.onBackground }]}>{item.distance} км</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <MaterialCommunityIcons name="package-variant" size={18} color={theme.colors.onBackground} style={{ marginRight: 4 }} />
                <Text variant="bodyMedium" style={[styles.info, { color: theme.colors.onBackground }]}>{item.packaging_type && typeof item.packaging_type === 'object' ? item.packaging_type.name : item.packaging_type}</Text>
                <MaterialCommunityIcons name="truck-outline" size={18} color={theme.colors.onBackground} style={{ marginLeft: 8, marginRight: 4 }} />
                <Text variant="bodyMedium" style={[styles.info, { color: theme.colors.onBackground }]}>{item.vehicle_model ? `${item.vehicle_model.model} (${item.vehicle_model.number})` : ''}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <MaterialCommunityIcons name="clipboard-list-outline" size={18} color={theme.colors.onBackground} style={{ marginRight: 4 }} />
                <Text variant="bodyMedium" style={[styles.info, { color: theme.colors.onBackground }]}>{item.service && typeof item.service === 'object' ? item.service.name : item.service}</Text>
                <MaterialCommunityIcons name="cube-outline" size={18} color={theme.colors.onBackground} style={{ marginLeft: 8, marginRight: 4 }} />
                <Text variant="bodyMedium" style={[styles.info, { color: theme.colors.onBackground }]}>{item.cargo_type && typeof item.cargo_type === 'object' ? item.cargo_type.name : item.cargo_type}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{
                  backgroundColor: item.delivery_status_color || theme.colors.primary,
                  color: darkenColor(item.delivery_status_color || theme.colors.primary, 50),
                  borderRadius: 12,
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                  fontSize: 14,
                  fontWeight: 'bold',
                  overflow: 'hidden',
                  alignSelf: 'flex-start',
                }}>{item.delivery_status && typeof item.delivery_status === 'object' ? item.delivery_status.name : item.delivery_status}</Text>
              </View>
            </View>
          );
        }}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 16,
  },
  card: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderRadius: 0,
    marginBottom: 0,
  },
  info: {
    marginTop: 4,
    marginBottom: 4,
  },
  package: {
    fontStyle: 'italic',
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  customBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: 'transparent',
    minHeight: 36,
    justifyContent: 'center',
    gap: 4,
  },
  customBtnActive: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderColor: '#fff',
  },
  customBtnText: {
    flex: 1,
    marginLeft: 2,
    fontSize: 15,
    textAlign: 'left',
  },
}); 