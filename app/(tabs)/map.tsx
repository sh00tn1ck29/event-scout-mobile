import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa wydarzeń</Text>
      <View style={styles.placeholder}>
        <Ionicons name="map-outline" size={40} color="#4057D6" />
        <Text style={styles.placeholderTitle}>Mapa pojawi się wkrótce</Text>
        <Text style={styles.description}>
          Widok mapy zostanie podłączony w ramach integracji GPS i map.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F7F8FC',
  },
  title: {
    marginTop: 36,
    color: '#1E2440',
    fontSize: 30,
    fontWeight: '700',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E2E5F0',
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
  },
  placeholderTitle: {
    marginTop: 16,
    color: '#1E2440',
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    marginTop: 8,
    color: '#666D82',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
  },
});
