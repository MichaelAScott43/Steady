import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const tabs = [
  ['index', 'Home', 'home-outline'],
  ['transactions', 'Transactions', 'receipt-outline'],
  ['insights', 'Insights', 'bulb-outline'],
  ['stability', 'Stability', 'heart-outline'],
  ['profile', 'Profile', 'person-outline']
] as const;

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: '#111317' }, tabBarActiveTintColor: '#d4af37' }}>
      {tabs.map(([name, title, icon]) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, size }) => <Ionicons name={icon as any} size={size} color={color} />
          }}
        />
      ))}
    </Tabs>
  );
}
