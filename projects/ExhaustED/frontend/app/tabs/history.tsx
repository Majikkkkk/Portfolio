import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';
import { RiskColors, useThemeColors } from '@/constants/colors';
import { useAssessmentStore } from '@/store/assessmentStore';
import { useAuthStore } from '@/store/authStore';

export default function HistoryScreen() {
  const colors = useThemeColors();
  const { width } = useWindowDimensions();
  const user = useAuthStore((state) => state.user);
  const history = useAssessmentStore((state) => state.history);
  const checkins = useAssessmentStore((state) => state.checkins);
  const isCompact = width < 380;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingHorizontal: isCompact ? 16 : 20 }]}>
        <Header title="ExhaustED" subtitle="Student wellness support for heavy academic days." />
        <Text style={[styles.pageTitle, { color: colors.textPrimary }]}>History</Text>
        <Text style={[styles.pageSubtitle, { color: colors.textSecondary }]}>Saved wellness activity for {user?.email || 'this account'} only.</Text>

        <SectionTitle title="Assessment results" />
        {history.map((item) => {
          const riskStyle = RiskColors[colors.mode][item.riskLevel];
          return (
            <Card key={item.createdAt} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={[styles.title, { color: colors.textPrimary }]}>{item.riskLevel}</Text>
                <View style={[styles.pill, { backgroundColor: riskStyle.bg, borderColor: riskStyle.border }]}>
                  <Text style={[styles.pillText, { color: riskStyle.text }]}>{item.burnoutScore}/100</Text>
                </View>
              </View>
              <Text style={[styles.text, { color: colors.textSecondary }]} numberOfLines={2}>
                {item.recommendations[0] || 'Saved burnout assessment result.'}
              </Text>
              <Text style={[styles.date, { color: colors.textTertiary }]}>{new Date(item.createdAt).toLocaleString()}</Text>
            </Card>
          );
        })}

        <SectionTitle title="Daily check-ins" />
        {checkins.map((item) => (
          <Card key={item.date} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={[styles.title, { color: colors.textPrimary }]}>{item.mood}</Text>
              <Text style={[styles.score, { color: colors.mintDark }]}>{item.wellnessScore}/100</Text>
            </View>
            <Text style={[styles.text, { color: colors.textSecondary }]}>Stress {item.stressLevel}/10 • Sleep {item.sleepHours}h • Motivation {item.motivationLevel}/10</Text>
            <Text style={[styles.date, { color: colors.textTertiary }]}>{new Date(item.date).toLocaleString()}</Text>
          </Card>
        ))}

        {!history.length && !checkins.length ? (
          <Card style={styles.emptyCard}>
            <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>No wellness history yet</Text>
            <Text style={[styles.empty, { color: colors.textSecondary }]}>
              Assessment results and daily check-ins for this account will appear here.
            </Text>
          </Card>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionTitle({ title }: { title: string }) {
  const colors = useThemeColors();
  return <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{title}</Text>;
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { paddingTop: 16, paddingBottom: 104, gap: 12 },
  pageTitle: { fontSize: 24, fontWeight: '900', marginTop: 6 },
  pageSubtitle: { lineHeight: 21, marginBottom: 4 },
  sectionTitle: { fontSize: 12, fontWeight: '900', textTransform: 'uppercase', marginTop: 8 },
  card: { gap: 8 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  title: { flex: 1, fontSize: 18, fontWeight: '900' },
  text: { lineHeight: 21 },
  score: { fontSize: 17, fontWeight: '900' },
  date: { fontSize: 12 },
  pill: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  pillText: { fontSize: 12, fontWeight: '900' },
  emptyCard: { alignItems: 'center', gap: 6 },
  emptyTitle: { fontSize: 18, fontWeight: '900' },
  empty: { textAlign: 'center', lineHeight: 21 },
});
