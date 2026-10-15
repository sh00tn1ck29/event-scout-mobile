import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function EventRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Szczegóły wydarzenia',
          headerBackTitle: 'Wróć',
          headerTintColor: '#4057D6',
          headerStyle: { backgroundColor: '#F7F8FC' },
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Szczegóły wydarzenia</Text>
        <Text style={styles.description}>
          Docelowy widok szczegółów zostanie przygotowany w kolejnym etapie.
        </Text>
        <Text style={styles.identifier}>Identyfikator testowy: {id}</Text>
      </View>
    </>
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
    fontSize: 26,
    fontWeight: '700',
  },
  description: {
    marginTop: 12,
    color: '#666D82',
    fontSize: 16,
    lineHeight: 24,
  },
  identifier: {
    marginTop: 24,
    color: '#858BA3',
    fontSize: 13,
  },
});
