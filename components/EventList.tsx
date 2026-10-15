import { FlatList, StyleSheet, View } from 'react-native';
import { theme } from '../constants/theme';
import type { Event } from '../types/event';
import { EmptyState } from './EmptyState';
import { EventCard } from './EventCard';
import { LoadingIndicator } from './LoadingIndicator';

interface EventListProps {
  events: Event[];
  onEventPress: (event: Event) => void;
  favoriteIds?: ReadonlySet<string>;
  onFavoritePress?: (event: Event) => void;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function EventList({
  events,
  onEventPress,
  favoriteIds,
  onFavoritePress,
  isLoading = false,
  emptyTitle = 'Nie znaleziono wydarzeń',
  emptyDescription = 'Spróbuj zmienić wyszukiwanie lub wybraną kategorię.',
}: EventListProps) {
  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <FlatList
      data={events}
      keyExtractor={(event) => event.id}
      renderItem={({ item }) => (
        <EventCard
          event={item}
          onPress={onEventPress}
          isFavorite={favoriteIds?.has(item.id) ?? false}
          onFavoritePress={onFavoritePress}
        />
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={
        <EmptyState title={emptyTitle} description={emptyDescription} />
      }
      contentContainerStyle={[
        styles.content,
        events.length === 0 && styles.emptyContent,
      ]}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: theme.spacing.xl,
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  separator: {
    height: theme.spacing.md,
  },
});
