import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4057D6',
        tabBarInactiveTintColor: '#858BA3',
        tabBarStyle: {
          height: 64,
          paddingTop: 7,
          paddingBottom: 8,
          borderTopColor: '#E8EAF2',
          backgroundColor: '#FFFFFF',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Wydarzenia',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Ulubione',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
