import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Text, useTheme, Appbar, IconButton } from 'react-native-paper';

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
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <Appbar.Header style={{ backgroundColor: theme.colors.background, elevation: 0, shadowOpacity: 0 }}>
        <Appbar.Content title="Доставка" titleStyle={{ color: theme.colors.onBackground }} />
        <IconButton icon="filter-variant" onPress={() => {}} accessibilityLabel="Фильтр" size={24} iconColor={theme.colors.onBackground} />
        <IconButton icon="magnify" onPress={() => {}} accessibilityLabel="Поиск" size={24} iconColor={theme.colors.onBackground} />
      </Appbar.Header>
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
    padding: 16,
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
}); 