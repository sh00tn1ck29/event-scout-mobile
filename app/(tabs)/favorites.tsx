import { StyleSheet, Text, View } from 'react-native';

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ulubione</Text>
      <Text style={styles.description}>
        Ekran ulubionych i ich stan pojawią się w kolejnych etapach.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F7F8FC',
  },
  title: {
    color: '#1E2440',
    fontSize: 30,
    fontWeight: '700',
  },
  description: {
    marginTop: 12,
    color: '#666D82',
    fontSize: 16,
    lineHeight: 24,
  },
});
