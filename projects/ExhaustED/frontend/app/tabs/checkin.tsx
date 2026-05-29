import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';
import { Input } from '@/components/ui/Input';
import { useThemeColors } from '@/constants/colors';
import { useAssessmentStore } from '@/store/assessmentStore';

export default function CheckinScreen() {
  const colors = useThemeColors();
  const { width } = useWindowDimensions();
  const addCheckin = useAssessmentStore((state) => state.addCheckin);
  const hasCheckedInToday = useAssessmentStore((state) => state.hasCheckedInToday);
  const [mood, setMood] = useState('Okay');
  const [sleepHours, setSleepHours] = useState('6');
  const [stressLevel, setStressLevel] = useState('5');
  const [motivationLevel, setMotivationLevel] = useState('5');
  const alreadyCheckedIn = hasCheckedInToday();
  const isCompact = width < 390;

  function submit() {
    try {
      const checkin = addCheckin({
        mood,
        sleepHours: Number(sleepHours) || 0,
        stressLevel: Number(stressLevel) || 0,
        motivationLevel: Number(motivationLevel) || 0,
      });
      Alert.alert('Check-in saved', `Wellness score: ${checkin.wellnessScore}/100. This was saved in History.`, [
        { text: 'OK', onPress: () => router.replace('/tabs') },
      ]);
    } catch (error) {
      Alert.alert('Daily check-in', error instanceof Error ? error.message : 'Please try again tomorrow.', [
        { text: 'OK', onPress: () => router.replace('/tabs') },
      ]);
    }
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingHorizontal: isCompact ? 16 : 20 }]}>
        <Header title="ExhaustED" subtitle="Student wellness support for heavy academic days." />
        <Card style={styles.card}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Daily Check-In</Text>
          {alreadyCheckedIn ? (
            <View style={[styles.notice, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
              <Text style={[styles.noticeTitle, { color: colors.textPrimary }]}>Already completed today</Text>
              <Text style={[styles.noticeText, { color: colors.textSecondary }]}>
                Your check-in is saved in History. Come back tomorrow for a new one.
              </Text>
              <Button title="Back to Home" onPress={() => router.replace('/tabs')} />
            </View>
          ) : (
            <>
              <Input label="Mood" value={mood} onChangeText={setMood} />
              <Input label="Sleep hours" value={sleepHours} onChangeText={setSleepHours} keyboardType="numeric" />
              <Input label="Stress level (1-10)" value={stressLevel} onChangeText={setStressLevel} keyboardType="numeric" />
              <Input label="Motivation level (1-10)" value={motivationLevel} onChangeText={setMotivationLevel} keyboardType="numeric" />
              <Button title="Save check-in" onPress={submit} />
            </>
          )}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { paddingTop: 16, paddingBottom: 104, gap: 16 },
  card: { gap: 14 },
  title: { fontSize: 22, fontWeight: '900' },
  notice: { borderWidth: 1, borderRadius: 16, padding: 16, gap: 10 },
  noticeTitle: { fontSize: 18, fontWeight: '900' },
  noticeText: { lineHeight: 21 },
});
