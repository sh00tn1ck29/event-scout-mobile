import { useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import { CategoryFilter } from '../../components/CategoryFilter';
import { EventList } from '../../components/EventList';
import { SearchBar } from '../../components/SearchBar';
import { theme } from '../../constants/theme';
import { mockEvents } from '../../data/mockEvents';
import type { Event } from '../../types/event';

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Wszystkie');

  const categories = useMemo(
    () => [...new Set(mockEvents.map((event) => event.category))],
    [],
  );

  const visibleEvents = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase('pl-PL');

    return mockEvents.filter((event) => {
      const matchesCategory =
        selectedCategory === 'Wszystkie' ||
        event.category === selectedCategory;
      const matchesSearch =
        normalizedQuery.length === 0 ||
        [
          event.title,
          event.description,
          event.category,
          event.location,
        ].some((value) =>
          value.toLocaleLowerCase('pl-PL').includes(normalizedQuery),
        );

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleEventPress = (event: Event) => {
    router.push({
      pathname: '/event/[id]',
      params: { id: event.id },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>EVENT SCOUT</Text>
        <Text style={styles.title}>Odkrywaj wydarzenia</Text>
        <Text style={styles.description}>
          Znajdź coś ciekawego w swojej okolicy.
        </Text>
        <View style={styles.search}>
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        </View>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <Text style={styles.resultCount}>
          {visibleEvents.length === 1
            ? '1 wydarzenie'
            : `${visibleEvents.length} wydarzeń`}
        </Text>
      </View>
      <EventList
        events={visibleEvents}
        onEventPress={handleEventPress}
        emptyTitle="Nie znaleziono wydarzeń"
        emptyDescription="Zmień frazę lub kategorię, aby zobaczyć inne propozycje."
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
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  eyebrow: {
    marginBottom: theme.spacing.xs,
    color: theme.colors.primary,
    fontSize: theme.typography.caption,
    fontWeight: '700',
    letterSpacing: 1.5,
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
  search: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  resultCount: {
    marginTop: theme.spacing.sm,
    color: theme.colors.textMuted,
    fontSize: theme.typography.caption,
    fontWeight: '600',
  },
});
