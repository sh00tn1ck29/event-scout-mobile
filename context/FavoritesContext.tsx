import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

interface FavoritesContextValue {
  favoriteIds: ReadonlySet<string>;
  isFavorite: (eventId: string) => boolean;
  toggleFavorite: (eventId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: PropsWithChildren) {
  const [favoriteIdList, setFavoriteIdList] = useState<string[]>([]);

  const toggleFavorite = useCallback((eventId: string) => {
    setFavoriteIdList((currentIds) =>
      currentIds.includes(eventId)
        ? currentIds.filter((id) => id !== eventId)
        : [...currentIds, eventId],
    );
  }, []);

  const favoriteIds = useMemo(() => new Set(favoriteIdList), [favoriteIdList]);
  const isFavorite = useCallback(
    (eventId: string) => favoriteIds.has(eventId),
    [favoriteIds],
  );

  const value = useMemo(
    () => ({ favoriteIds, isFavorite, toggleFavorite }),
    [favoriteIds, isFavorite, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites musi być użyty wewnątrz FavoritesProvider.');
  }

  return context;
}
