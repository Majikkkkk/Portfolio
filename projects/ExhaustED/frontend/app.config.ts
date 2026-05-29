import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'ExhaustED',
  slug: 'exhausted',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  splash: {
    resizeMode: 'contain',
    backgroundColor: '#E1F5EE',
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.exhausted.app',
    infoPlist: {
      NSUserNotificationUsageDescription: 'ExhaustED uses notifications for wellness reminders.',
    },
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#1D9E75',
    },
    package: 'com.exhausted.app',
    permissions: ['RECEIVE_BOOT_COMPLETED', 'VIBRATE'],
  },
  plugins: [
    'expo-router',
    [
      'expo-notifications',
      {
        color: '#1D9E75',
      },
    ],
  ],
  extra: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api',
    eas: { projectId: 'your-eas-project-id' },
  },
  scheme: 'exhausted',
});
