import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { theme } from '../constants/theme';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  allLabel?: string;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  allLabel = 'Wszystkie',
}: CategoryFilterProps) {
  const options = [allLabel, ...categories.filter((category) => category !== allLabel)];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      accessibilityLabel="Filtruj według kategorii"
    >
      {options.map((category) => {
        const isSelected = selectedCategory === category;

        return (
          <Pressable
            key={category}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onSelectCategory(category)}
            style={[styles.option, isSelected && styles.selectedOption]}
          >
            <Text style={[styles.label, isSelected && styles.selectedLabel]}>
              {category}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  option: {
    minHeight: 38,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surface,
  },
  selectedOption: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  label: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption,
    fontWeight: '600',
  },
  selectedLabel: {
    color: theme.colors.surface,
  },
});
