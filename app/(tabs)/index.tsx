import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>EVENT SCOUT</Text>
      <Text style={styles.title}>Wydarzenia</Text>
      <Text style={styles.description}>
        Ekran główny z wyszukiwaniem i listą wydarzeń zostanie przygotowany w
        kolejnym etapie.
      </Text>
      <Link
        href={{ pathname: '/event/[id]', params: { id: 'demo' } }}
        asChild
      >
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Sprawdź nawigację do szczegółów</Text>
        </Pressable>
      </Link>
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
  eyebrow: {
    marginBottom: 8,
    color: '#4057D6',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
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
  button: {
    alignSelf: 'flex-start',
    marginTop: 24,
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: 14,
    backgroundColor: '#4057D6',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
