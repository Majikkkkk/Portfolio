import { ComponentProps } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@/constants/colors';

type IconName = ComponentProps<typeof Ionicons>['name'];

const icons: Record<string, { active: IconName; inactive: IconName }> = {
  index: { active: 'home', inactive: 'home-outline' },
  checkin: { active: 'leaf', inactive: 'leaf-outline' },
  assessment: { active: 'clipboard', inactive: 'clipboard-outline' },
  journal: { active: 'book', inactive: 'book-outline' },
  community: { active: 'people', inactive: 'people-outline' },
  analytics: { active: 'bar-chart', inactive: 'bar-chart-outline' },
  chatbot: { active: 'chatbubble-ellipses', inactive: 'chatbubble-ellipses-outline' },
  history: { active: 'time', inactive: 'time-outline' },
  profile: { active: 'person', inactive: 'person-outline' },
};

export default function TabsLayout() {
  const colors = useThemeColors();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.mint,
        tabBarInactiveTintColor: colors.textSecondary,
        sceneStyle: { backgroundColor: colors.background },
        tabBarStyle: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 82,
          borderTopWidth: 0,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          backgroundColor: colors.surface,
          paddingHorizontal: 10,
          paddingTop: 8,
          paddingBottom: 12,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: -8 },
          shadowOpacity: 0.10,
          shadowRadius: 18,
          elevation: 10,
        },
        tabBarItemStyle: {
          borderRadius: 16,
          minWidth: 0,
          paddingHorizontal: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '800',
          marginTop: 0,
        },
        tabBarIcon: ({ focused, color }) => {
          const icon = icons[route.name] ?? icons.index;
          return (
            <Ionicons
              name={focused ? icon.active : icon.inactive}
              size={focused ? 24 : 22}
              color={color}
              style={{
                backgroundColor: focused ? colors.mintLight : 'transparent',
                borderRadius: 14,
                paddingHorizontal: focused ? 10 : 6,
                paddingVertical: 7,
                overflow: 'hidden',
              }}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="checkin" options={{ title: 'Check-in', href: null }} />
      <Tabs.Screen name="assessment" options={{ title: 'Burnout', href: null }} />
      <Tabs.Screen name="journal" options={{ title: 'Journal' }} />
      <Tabs.Screen name="community" options={{ title: 'Community' }} />
      <Tabs.Screen name="analytics" options={{ title: 'Analytics', href: null }} />
      <Tabs.Screen name="chatbot" options={{ title: 'Chatbot' }} />
      <Tabs.Screen name="history" options={{ title: 'History', href: null }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
