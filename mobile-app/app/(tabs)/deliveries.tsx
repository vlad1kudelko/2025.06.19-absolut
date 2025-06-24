import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Text, useTheme, Appbar, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

const deliveries = [
  {
    id: '001',
    time: '12:30',
    distance: '15 км',
    cargoType: 'Документы',
    packageType: 'Конверт',
  },
  {
    id: '002',
    time: '14:00',
    distance: '8 км',
    cargoType: 'Электроника',
    packageType: 'Коробка',
  },
  {
    id: '003',
    time: '16:15',
    distance: '22 км',
    cargoType: 'Одежда',
    packageType: 'Пакет',
  },
];

function DeliveryItem({ item }: { item: typeof deliveries[0] }) {
  const theme = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: theme.colors.background, borderBottomColor: theme.colors.outlineVariant }]}> 
      <Text variant="titleMedium" style={{ color: theme.colors.onBackground }}>№ {item.id}</Text>
      <Text variant="bodyMedium" style={[styles.info, { color: theme.colors.onBackground }]}>{item.time} · {item.distance} · {item.cargoType}</Text>
      <Text variant="bodySmall" style={[styles.package, { color: theme.colors.onBackground }]}>{item.packageType}</Text>
    </View>
  );
}

export default function DeliveriesScreen() {
  const theme = useTheme();
  const [filter, setFilter] = useState('time');
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
      <FlatList
        data={deliveries}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <DeliveryItem item={item} />}
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