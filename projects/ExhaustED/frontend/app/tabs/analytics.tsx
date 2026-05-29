import { ScrollView, StyleSheet, Text } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';
import { Colors } from '@/constants/colors';
import { useAssessmentStore } from '@/store/assessmentStore';

export default function AnalyticsScreen() {
  const checkins = useAssessmentStore((state) => state.checkins);
  const history = useAssessmentStore((state) => state.history);
  const averageWellness = checkins.length
    ? Math.round(checkins.reduce((sum, item) => sum + item.wellnessScore, 0) / checkins.length)
    : null;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Header title="Analytics" subtitle="Simple trends from your local wellness data." />
      <Card>
        <Text style={styles.value}>{averageWellness ?? '--'}</Text>
        <Text style={styles.label}>Average wellness score</Text>
      </Card>
      <Card>
        <Text style={styles.value}>{history.length}</Text>
        <Text style={styles.label}>Completed assessments</Text>
      </Card>
      <Card>
        <Text style={styles.sectionTitle}>Insight</Text>
        <Text style={styles.text}>
          {averageWellness
            ? averageWellness >= 70
              ? 'Your recent wellness pattern looks stable. Keep protecting sleep and breaks.'
              : 'Your wellness score suggests you may benefit from lighter task blocks and more recovery time.'
            : 'Add a daily check-in to unlock your first wellness insight.'}
        </Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, gap: 16 },
  value: { color: Colors.mint, fontSize: 34, fontWeight: '900' },
  label: { color: Colors.textSecondary, marginTop: 4 },
  sectionTitle: { color: Colors.textPrimary, fontSize: 18, fontWeight: '800', marginBottom: 8 },
  text: { color: Colors.textSecondary, lineHeight: 22 },
});
