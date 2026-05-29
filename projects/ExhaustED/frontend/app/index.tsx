import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColors } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';

export default function Index() {
  const colors = useThemeColors();
  const { width } = useWindowDimensions();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.92)).current;
  const size = Math.min(132, Math.max(104, width * 0.29));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 850,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 7,
        tension: 55,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace(isAuthenticated ? '/tabs' : '/auth/login');
    }, 2400);

    return () => clearTimeout(timer);
  }, [fade, isAuthenticated, scale]);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.background}>
        <View style={[styles.softCircleTop, { backgroundColor: colors.mintLight }]} />
        <View style={[styles.softCircleBottom, { backgroundColor: colors.surfaceSecondary }]} />
      </View>
      <Animated.View style={[styles.center, { opacity: fade, transform: [{ scale }] }]}>
        <View
          style={[
            styles.logo,
            {
              width: size,
              height: size,
              borderRadius: size * 0.31,
              backgroundColor: colors.mintLight,
              borderColor: colors.border,
              shadowColor: colors.shadow,
            },
          ]}
        >
          <View style={[styles.logoInner, { backgroundColor: colors.mint }]}>
            <Ionicons name="leaf" size={size * 0.42} color={colors.white} />
          </View>
          <View style={[styles.logoBadge, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Ionicons name="heart" size={18} color={colors.coral} />
          </View>
        </View>
        <Text style={[styles.brand, { color: colors.textPrimary }]}>ExhaustED</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Student Burnout Wellness Support</Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  background: { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  softCircleTop: { position: 'absolute', width: 260, height: 260, borderRadius: 130, top: -80, right: -80, opacity: 0.85 },
  softCircleBottom: { position: 'absolute', width: 320, height: 320, borderRadius: 160, bottom: -130, left: -110, opacity: 0.9 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28 },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.1,
    shadowRadius: 28,
    elevation: 6,
  },
  logoInner: { width: '62%', height: '62%', borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  logoBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: { marginTop: 22, fontSize: 34, lineHeight: 40, fontWeight: '900', letterSpacing: 0 },
  subtitle: { marginTop: 7, fontSize: 15, lineHeight: 22, fontWeight: '700', textAlign: 'center' },
});
