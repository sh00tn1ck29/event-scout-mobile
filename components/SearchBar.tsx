import { Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import { theme } from '../constants/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  accessibilityLabel?: string;
  returnKeyType?: TextInputProps['returnKeyType'];
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Szukaj wydarzeń',
  accessibilityLabel = 'Szukaj wydarzeń',
  returnKeyType = 'search',
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search-outline"
        size={20}
        color={theme.colors.textMuted}
      />
      <TextInput
        accessibilityLabel={accessibilityLabel}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        returnKeyType={returnKeyType}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
      />
      {value.length > 0 ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Wyczyść wyszukiwanie"
          onPress={() => onChangeText('')}
          hitSlop={8}
        >
          <Ionicons
            name="close-circle"
            size={18}
            color={theme.colors.textMuted}
          />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
  },
  input: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    color: theme.colors.text,
    fontSize: theme.typography.body,
  },
});
