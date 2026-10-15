import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';

interface LoadingIndicatorProps {
  message?: string;
}

export function LoadingIndicator({
  message = 'Ładowanie wydarzeń…',
}: LoadingIndicatorProps) {
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={message}
      style={styles.container}
    >
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  message: {
    marginTop: theme.spacing.md,
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body,
  },
});
