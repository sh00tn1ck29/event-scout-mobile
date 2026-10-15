import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { theme } from '../constants/theme';
import type { Event } from '../types/event';
import { FavoriteButton } from './FavoriteButton';

interface EventCardProps {
  event: Event;
  onPress: (event: Event) => void;
  isFavorite?: boolean;
  onFavoritePress?: (event: Event) => void;
}

export function EventCard({
  event,
  onPress,
  isFavorite = false,
  onFavoritePress,
}: EventCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(event.imageUrl) && !imageFailed;

  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Szczegóły wydarzenia: ${event.title}`}
        onPress={() => onPress(event)}
        style={({ pressed }) => [
          styles.content,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.imageContainer}>
          {showImage ? (
            <Image
              source={{ uri: event.imageUrl }}
              onError={() => setImageFailed(true)}
              resizeMode="cover"
              style={styles.image}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons
                name="sparkles-outline"
                size={26}
                color={theme.colors.primary}
              />
            </View>
          )}
        </View>
        <View style={styles.details}>
          <Text numberOfLines={1} style={styles.category}>
            {event.category}
          </Text>
          <Text numberOfLines={2} style={styles.title}>
            {event.title}
          </Text>
          <View style={styles.metadata}>
            <Ionicons
              name="calendar-outline"
              size={14}
              color={theme.colors.textMuted}
            />
            <Text numberOfLines={1} style={styles.metadataText}>
              {event.date} · {event.time}
            </Text>
          </View>
          <View style={styles.metadata}>
            <Ionicons
              name="location-outline"
              size={14}
              color={theme.colors.textMuted}
            />
            <Text numberOfLines={1} style={styles.metadataText}>
              {event.location}
            </Text>
          </View>
        </View>
      </Pressable>
      {onFavoritePress ? (
        <View style={styles.favorite}>
          <FavoriteButton
            isFavorite={isFavorite}
            onPress={() => onFavoritePress(event)}
            size={20}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 144,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
  },
  content: {
    minHeight: 144,
    flexDirection: 'row',
    padding: theme.spacing.md,
  },
  pressed: {
    opacity: 0.82,
  },
  imageContainer: {
    width: 104,
    minHeight: 116,
    overflow: 'hidden',
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.placeholder,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    flex: 1,
    justifyContent: 'center',
    gap: theme.spacing.xs,
    paddingLeft: theme.spacing.md,
    paddingRight: 34,
  },
  category: {
    color: theme.colors.primary,
    fontSize: theme.typography.caption,
    fontWeight: '700',
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    fontWeight: '700',
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  metadataText: {
    flex: 1,
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption,
  },
  favorite: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
  },
});
