import { useMemo } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import { EventList } from '../../components/EventList';
import { theme } from '../../constants/theme';
import { useFavorites } from '../../context/FavoritesContext';
import { mockEvents } from '../../data/mockEvents';
import type { Event } from '../../types/event';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favoriteIds, toggleFavorite } = useFavorites();
  const favoriteEvents = useMemo(
    () => mockEvents.filter((event) => favoriteIds.has(event.id)),
    [favoriteIds],
  );

  const handleEventPress = (event: Event) => {
    router.push({
      pathname: '/event/[id]',
      params: { id: event.id },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Ulubione</Text>
        <Text style={styles.description}>
          Zapisane wydarzenia, do których chcesz wrócić.
        </Text>
      </View>
      <EventList
        events={favoriteEvents}
        onEventPress={handleEventPress}
        favoriteIds={favoriteIds}
        onFavoritePress={(event) => toggleFavorite(event.id)}
        emptyTitle="Nie masz jeszcze ulubionych"
        emptyDescription="Dodaj wydarzenie do ulubionych, a pojawi się tutaj."
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.title,
    fontWeight: '700',
  },
  description: {
    marginTop: theme.spacing.xs,
    color: theme.colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
  },
});
