import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';

interface EmptyStateProps {
  title: string;
  description?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
}

export function EmptyState({
  title,
  description,
  iconName = 'calendar-outline',
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Ionicons name={iconName} size={30} color={theme.colors.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  icon: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.primaryLight,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.subtitle,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    maxWidth: 300,
    marginTop: theme.spacing.sm,
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body,
    lineHeight: 22,
    textAlign: 'center',
  },
});
