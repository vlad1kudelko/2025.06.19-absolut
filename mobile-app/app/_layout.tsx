import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { PaperProvider, MD3DarkTheme, Text, Button } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAvoidingView, Platform, TextInput, View } from 'react-native';

function LoginScreen({ onLogin }: { onLogin: (token: string) => void }) {
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
    <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', padding: 24, backgroundColor: MD3DarkTheme.colors.background }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={{ color: MD3DarkTheme.colors.onBackground, fontSize: 24, marginBottom: 24, textAlign: 'center' }}>Вход</Text>
      <TextInput
        placeholder="Логин"
        value={username}
        onChangeText={setUsername}
        style={{ backgroundColor: MD3DarkTheme.colors.elevation.level1, color: MD3DarkTheme.colors.onBackground, borderRadius: 8, marginBottom: 12, padding: 12 }}
        placeholderTextColor={MD3DarkTheme.colors.onBackground}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        style={{ backgroundColor: MD3DarkTheme.colors.elevation.level1, color: MD3DarkTheme.colors.onBackground, borderRadius: 8, marginBottom: 12, padding: 12 }}
        placeholderTextColor={MD3DarkTheme.colors.onBackground}
        secureTextEntry
      />
      {error && <Text style={{ color: 'red', marginBottom: 12, textAlign: 'center' }}>{error}</Text>}
      <Button mode="contained" onPress={handleLogin} loading={loading} disabled={loading} style={{ marginTop: 8 }}>
        Войти
      </Button>
    </KeyboardAvoidingView>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [token, setToken] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    (async () => {
      const t = await AsyncStorage.getItem('jwt');
      if (!t) {
        setAuthChecked(true);
        return;
      }
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

  if (!loaded || !authChecked) {
    return null;
  }
  if (!token) {
    return (
      <PaperProvider theme={MD3DarkTheme}>
        <LoginScreen onLogin={setToken} />
        <StatusBar style="light" />
      </PaperProvider>
    );
  }

  return (
    <PaperProvider theme={MD3DarkTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </PaperProvider>
  );
}
