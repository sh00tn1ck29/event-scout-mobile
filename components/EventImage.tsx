import { Ionicons } from '@expo/vector-icons';
import {
  Image,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useState } from 'react';
import { theme } from '../constants/theme';

interface EventImageProps {
  imageUrl?: string;
  containerStyle?: StyleProp<ViewStyle>;
  placeholderIconSize?: number;
}

export function EventImage({
  imageUrl,
  containerStyle,
  placeholderIconSize = 26,
}: EventImageProps) {
  const [failedImageUrl, setFailedImageUrl] = useState<string | undefined>();
  const showImage = Boolean(imageUrl) && failedImageUrl !== imageUrl;

  return (
    <View style={[styles.container, containerStyle]}>
      {showImage ? (
        <Image
          source={{ uri: imageUrl }}
          onError={() => setFailedImageUrl(imageUrl)}
          resizeMode="cover"
          style={styles.image}
        />
      ) : (
        <Placeholder iconSize={placeholderIconSize} />
      )}
    </View>
  );
}

function Placeholder({ iconSize }: { iconSize: number }) {
  return (
    <View style={styles.placeholder}>
      <Ionicons
        name="sparkles-outline"
        size={iconSize}
        color={theme.colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: theme.colors.placeholder,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
