import { StyleSheet, Text, View } from 'react-native';
import { useThemeColors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

export function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  const colors = useThemeColors();

  return (
    <View style={styles.wrap}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      {subtitle ? <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingTop: 8, paddingBottom: 4 },
  title: Typography.headingLarge,
  subtitle: { ...Typography.body, marginTop: 6 },
});
