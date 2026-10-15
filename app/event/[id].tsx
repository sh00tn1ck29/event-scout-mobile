import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EmptyState } from '../../components/EmptyState';
import { EventImage } from '../../components/EventImage';
import { FavoriteButton } from '../../components/FavoriteButton';
import { theme } from '../../constants/theme';
import { useFavorites } from '../../context/FavoritesContext';
import { useEvents } from '../../hooks/useEvents';

export default function EventRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { events, isLoading, error } = useEvents();
  const event = events.find((item) => item.id === id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const content = isLoading ? (
    <View style={styles.stateContainer}>
      <Text style={styles.loadingText}>Ładowanie wydarzenia…</Text>
    </View>
  ) : error ? (
    <View style={styles.stateContainer}>
      <EmptyState
        iconName="alert-circle-outline"
        title="Nie udało się wczytać wydarzenia"
        description={error}
      />
    </View>
  ) : event ? (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <EventImage
        imageUrl={event.imageUrl}
        containerStyle={styles.hero}
        placeholderIconSize={48}
      />
      <View style={styles.details}>
        <Text style={styles.category}>{event.category}</Text>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{event.title}</Text>
          <FavoriteButton
            isFavorite={isFavorite(event.id)}
            onPress={() => toggleFavorite(event.id)}
          />
        </View>
        <View style={styles.metadataCard}>
          <MetadataRow
            icon="calendar-outline"
            label="Data i godzina"
            value={`${event.date} · ${event.time}`}
          />
          <View style={styles.divider} />
          <MetadataRow
            icon="location-outline"
            label="Miejsce"
            value={event.location}
          />
        </View>
        <Text style={styles.sectionTitle}>O wydarzeniu</Text>
        <Text style={styles.description}>{event.description}</Text>
      </View>
    </ScrollView>
  ) : (
    <View style={styles.stateContainer}>
      <EmptyState
        iconName="search-outline"
        title="Nie znaleziono wydarzenia"
        description="To wydarzenie może być niedostępne lub zostało usunięte."
      />
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Szczegóły wydarzenia',
          headerBackTitle: 'Wróć',
          headerTintColor: theme.colors.primary,
          headerStyle: { backgroundColor: theme.colors.background },
        }}
      />
      {content}
    </>
  );
}

interface MetadataRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}

function MetadataRow({ icon, label, value }: MetadataRowProps) {
  return (
    <View style={styles.metadataRow}>
      <View style={styles.metadataIcon}>
        <Ionicons name={icon} size={20} color={theme.colors.primary} />
      </View>
      <View style={styles.metadataText}>
        <Text style={styles.metadataLabel}>{label}</Text>
        <Text style={styles.metadataValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingBottom: theme.spacing.xxl,
  },
  hero: {
    height: 250,
    margin: theme.spacing.lg,
    overflow: 'hidden',
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.placeholder,
  },
  details: {
    paddingHorizontal: theme.spacing.xl,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  category: {
    color: theme.colors.primary,
    fontSize: theme.typography.caption,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  title: {
    flex: 1,
    marginTop: theme.spacing.sm,
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 35,
  },
  metadataCard: {
    marginTop: theme.spacing.xl,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  metadataIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primaryLight,
  },
  metadataText: {
    flex: 1,
  },
  metadataLabel: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.caption,
  },
  metadataValue: {
    marginTop: 2,
    color: theme.colors.text,
    fontSize: theme.typography.body,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: theme.spacing.md,
    backgroundColor: theme.colors.border,
  },
  sectionTitle: {
    marginTop: theme.spacing.xl,
    color: theme.colors.text,
    fontSize: theme.typography.subtitle,
    fontWeight: '700',
  },
  description: {
    marginTop: theme.spacing.sm,
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body,
    lineHeight: 24,
  },
  stateContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body,
    textAlign: 'center',
  },
});
