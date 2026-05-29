import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/Card';
import { RiskColors, useThemeColors } from '@/constants/colors';
import { useAssessmentStore } from '@/store/assessmentStore';
import { useAuthStore } from '@/store/authStore';

type IconName = keyof typeof Ionicons.glyphMap;

export default function DashboardScreen() {
  const colors = useThemeColors();
  const { width } = useWindowDimensions();
  const user = useAuthStore((state) => state.user);
  const latestResult = useAssessmentStore((state) => state.latestResult);
  const history = useAssessmentStore((state) => state.history);
  const checkins = useAssessmentStore((state) => state.checkins);
  const isCompact = width < 390;
  const latestCheckin = checkins[0];
  const previousResult = history[1];
  const firstName = (user?.fullName || 'Student').split(' ')[0];
  const riskStyle = latestResult ? RiskColors[colors.mode][latestResult.riskLevel] : null;
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning,';
    if (hour < 18) return 'Good afternoon,';
    return 'Good evening,';
  }, []);
  const trend =
    latestResult && previousResult
      ? latestResult.burnoutScore < previousResult.burnoutScore
        ? 'Improving'
        : latestResult.burnoutScore > previousResult.burnoutScore
          ? 'Rising'
          : 'Steady'
      : latestResult
        ? 'Baseline'
        : 'No data';

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingHorizontal: isCompact ? 16 : width >= 720 ? 36 : 22,
            paddingTop: isCompact ? 10 : 14,
          },
        ]}
      >
        <View style={[styles.hero, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
          <View style={styles.heroText}>
            <Text style={[styles.greeting, { color: colors.textPrimary }]}>{greeting}</Text>
            <View style={styles.nameLine}>
              <Text style={[styles.heroName, { color: colors.textPrimary }]} numberOfLines={1} adjustsFontSizeToFit>
                {firstName}
              </Text>
              <Ionicons name="heart-outline" size={25} color={colors.mint} />
            </View>
            <Text style={[styles.tagline, { color: colors.textSecondary }]}>
              You've made it through today.{'\n'}Let's take care of you.
            </Text>
          </View>
          <WellnessIllustration />
        </View>

        <Card style={[styles.snapshotCard, { backgroundColor: colors.mintLight, borderColor: colors.border }]}>
          <View style={styles.snapshotText}>
            <Text style={[styles.snapshotLabel, { color: colors.mintDark }]}>Current wellness snapshot</Text>
            <Text style={[styles.snapshotTitle, { color: colors.textPrimary }]}>
              {latestResult?.riskLevel || 'No assessment yet'}
            </Text>
            <Text style={[styles.snapshotBody, { color: colors.textSecondary }]}>
              {latestResult
                ? `Burnout score ${latestResult.burnoutScore}/100. Latest assessment saved to your History.`
                : 'Take a short assessment to understand your current burnout risk.'}
            </Text>
            <View style={styles.snapshotActions}>
              <Link href="/tabs/assessment" asChild>
                <Pressable style={[styles.primaryAction, { backgroundColor: colors.mint }]}>
                  <Text style={[styles.primaryActionText, { color: colors.white }]}>
                    {latestResult ? 'Retake Assessment' : 'Take Assessment'}
                  </Text>
                </Pressable>
              </Link>
              {latestResult ? (
                <Link href="/tabs/history" asChild>
                  <Pressable style={[styles.secondaryAction, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={[styles.secondaryActionText, { color: colors.mintDark }]}>Saved Result</Text>
                  </Pressable>
                </Link>
              ) : null}
            </View>
          </View>
          <View style={styles.snapshotArt}>
            <Ionicons name="pulse" size={34} color={colors.white} />
          </View>
          {riskStyle ? (
            <View style={[styles.riskPill, { backgroundColor: riskStyle.bg, borderColor: riskStyle.border }]}>
              <Text style={[styles.riskPillText, { color: riskStyle.text }]}>Saved result</Text>
            </View>
          ) : null}
        </Card>

        <View style={styles.statsGrid}>
          <StatCard href="/tabs/analytics" icon="sparkles" label="Wellness Score" value={latestCheckin?.wellnessScore ? `${latestCheckin.wellnessScore}` : '--'} />
          <StatCard href="/tabs/history" icon="leaf" label="Saved Check-ins" value={`${checkins.length}`} />
          <StatCard href="/tabs/checkin" icon="happy" label="Latest Mood" value={latestCheckin?.mood || 'None'} />
          <StatCard href="/tabs/analytics" icon="trending-up" label="Burnout Trend" value={trend} />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Quick actions</Text>
          <Text style={[styles.sectionCaption, { color: colors.textTertiary }]}>Tools outside the bottom navigation</Text>
        </View>

        <View style={styles.quickList}>
          <QuickAction href="/tabs/checkin" icon="leaf" title="Daily Check-In" subtitle="Log mood, sleep, stress, and motivation." tone="mint" />
          <QuickAction href="/tabs/assessment" icon="clipboard" title="Burnout Assessment" subtitle="Understand your current burnout risk." tone="lavender" />
          <QuickAction href="/tabs/analytics" icon="bar-chart" title="Analytics" subtitle="See wellness patterns and trends." tone="amber" />
          <QuickAction href="/tabs/history" icon="time" title="History" subtitle="Open saved assessments and check-ins." tone="coral" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function WellnessIllustration() {
  const colors = useThemeColors();

  return (
    <View style={[styles.illustration, { backgroundColor: colors.mintLight }]}>
      <View style={[styles.sun, { backgroundColor: colors.amberLight }]} />
      <View style={[styles.hillBack, { backgroundColor: colors.surface }]} />
      <View style={[styles.hillFront, { backgroundColor: colors.mint }]} />
      <View style={[styles.leafBadge, { backgroundColor: colors.white, borderColor: colors.border }]}>
        <Ionicons name="leaf" size={28} color={colors.mint} />
      </View>
    </View>
  );
}

function StatCard({ href, icon, label, value }: { href: string; icon: IconName; label: string; value: string }) {
  const colors = useThemeColors();

  return (
    <Link href={href} asChild>
      <Pressable style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
        <View style={[styles.statIcon, { backgroundColor: colors.mintLight }]}>
          <Ionicons name={icon} size={18} color={colors.mintDark} />
        </View>
        <Text style={[styles.statValue, { color: colors.textPrimary }]} numberOfLines={1} adjustsFontSizeToFit>
          {value}
        </Text>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{label}</Text>
      </Pressable>
    </Link>
  );
}

function QuickAction({
  href,
  icon,
  title,
  subtitle,
  tone,
}: {
  href: string;
  icon: IconName;
  title: string;
  subtitle: string;
  tone: 'mint' | 'lavender' | 'amber' | 'coral';
}) {
  const colors = useThemeColors();
  const toneMap = {
    mint: { fg: colors.mintDark, bg: colors.mintLight },
    lavender: { fg: colors.lavender, bg: colors.lavenderLight },
    amber: { fg: colors.amber, bg: colors.amberLight },
    coral: { fg: colors.coral, bg: colors.coralLight },
  }[tone];

  return (
    <Link href={href} asChild>
      <Pressable style={[styles.quickRow, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
        <View style={[styles.quickIcon, { backgroundColor: toneMap.bg }]}>
          <Ionicons name={icon} size={22} color={toneMap.fg} />
        </View>
        <View style={styles.quickCopy}>
          <Text style={[styles.quickTitle, { color: colors.textPrimary }]}>{title}</Text>
          <Text style={[styles.quickSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color={colors.textTertiary} />
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { paddingBottom: 104, gap: 14 },
  hero: {
    minHeight: 138,
    borderRadius: 24,
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    elevation: 2,
  },
  heroText: { flex: 1, gap: 4 },
  greeting: { fontSize: 20, lineHeight: 25, fontWeight: '800' },
  nameLine: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  heroName: { flexShrink: 1, fontSize: 32, lineHeight: 38, fontWeight: '900', letterSpacing: 0 },
  tagline: { marginTop: 6, fontSize: 15, lineHeight: 22 },
  illustration: { width: 108, height: 108, borderRadius: 30, overflow: 'hidden' },
  sun: { position: 'absolute', width: 38, height: 38, borderRadius: 19, top: 13, right: 17 },
  hillBack: { position: 'absolute', width: 104, height: 70, borderTopLeftRadius: 70, borderTopRightRadius: 70, bottom: 13, left: 10, opacity: 0.74 },
  hillFront: { position: 'absolute', width: 132, height: 58, borderTopLeftRadius: 82, borderTopRightRadius: 82, bottom: -5, left: -13, opacity: 0.82 },
  leafBadge: { position: 'absolute', width: 50, height: 50, borderRadius: 20, borderWidth: 1, left: 27, top: 30, alignItems: 'center', justifyContent: 'center' },
  snapshotCard: { borderRadius: 24, padding: 17, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', gap: 12 },
  snapshotText: { flex: 1, gap: 9 },
  snapshotLabel: { fontSize: 12, lineHeight: 16, fontWeight: '900', textTransform: 'uppercase' },
  snapshotTitle: { fontSize: 27, lineHeight: 32, fontWeight: '900', letterSpacing: 0 },
  snapshotBody: { fontSize: 14, lineHeight: 20 },
  snapshotActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 3 },
  primaryAction: { minHeight: 44, borderRadius: 14, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center' },
  primaryActionText: { fontSize: 14, fontWeight: '900' },
  secondaryAction: { minHeight: 44, borderRadius: 14, borderWidth: 1, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center' },
  secondaryActionText: { fontSize: 14, fontWeight: '900' },
  snapshotArt: { width: 64, height: 64, borderRadius: 24, backgroundColor: '#1D9E75', alignItems: 'center', justifyContent: 'center' },
  riskPill: { position: 'absolute', top: 12, right: 12, borderWidth: 1, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  riskPillText: { fontSize: 11, fontWeight: '900' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statCard: {
    width: '48.5%',
    minHeight: 118,
    borderRadius: 20,
    borderWidth: 1,
    padding: 14,
    gap: 8,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  statIcon: { width: 36, height: 36, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  statValue: { fontSize: 22, lineHeight: 27, fontWeight: '900' },
  statLabel: { fontSize: 12, lineHeight: 17, fontWeight: '800' },
  sectionHeader: { gap: 2, marginTop: 2 },
  sectionTitle: { fontSize: 20, lineHeight: 25, fontWeight: '900' },
  sectionCaption: { fontSize: 12, lineHeight: 17, fontWeight: '700' },
  quickList: { gap: 10 },
  quickRow: {
    minHeight: 78,
    borderRadius: 20,
    borderWidth: 1,
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  quickIcon: { width: 46, height: 46, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  quickCopy: { flex: 1, gap: 3 },
  quickTitle: { fontSize: 15, lineHeight: 20, fontWeight: '900' },
  quickSubtitle: { fontSize: 13, lineHeight: 18 },
});
