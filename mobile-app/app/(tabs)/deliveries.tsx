import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';

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
    <Card style={[styles.card, { backgroundColor: theme.colors.elevation.level2 }]}> 
      <Card.Content>
        <Text variant="titleMedium">№ {item.id}</Text>
        <Text variant="bodyMedium" style={styles.info}>{item.time} · {item.distance} · {item.cargoType}</Text>
        <Text variant="bodySmall" style={styles.package}>{item.packageType}</Text>
      </Card.Content>
    </Card>
  );
}

export default function DeliveriesScreen() {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
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
    marginBottom: 12,
    borderRadius: 16,
  },
  info: {
    marginTop: 4,
    marginBottom: 4,
  },
  package: {
    fontStyle: 'italic',
    color: '#aaa',
  },
}); 