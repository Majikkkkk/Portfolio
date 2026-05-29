import React, { useState } from 'react';
import {
  Alert,
  GestureResponderEvent,
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { RiskColors, useThemeColors } from '@/constants/colors';
import { useAssessmentStore } from '@/store/assessmentStore';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

export default function AssessmentScreen() {
  const colors = useThemeColors();
  const { width } = useWindowDimensions();
  const submitAssessment = useAssessmentStore((state) => state.submitAssessment);
  const latestResult = useAssessmentStore((state) => state.latestResult);
  const [sleepHours, setSleepHours] = useState(6);
  const [stressLevel, setStressLevel] = useState(6);
  const [motivationLevel, setMotivationLevel] = useState(5);
  const [focusLevel, setFocusLevel] = useState(5);
  const riskStyle = latestResult ? RiskColors[colors.mode][latestResult.riskLevel] : null;
  const isCompact = width < 390;

  function calculate() {
    const result = submitAssessment({ sleepHours, stressLevel, motivationLevel, focusLevel });
    Alert.alert('Assessment saved', `${result.riskLevel} • ${result.burnoutScore}/100. This result was saved in History.`, [
      { text: 'OK', onPress: () => router.replace('/tabs') },
    ]);
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingHorizontal: isCompact ? 16 : 22,
            paddingTop: isCompact ? 10 : 14,
          },
        ]}
      >
        <View style={[styles.hero, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
          <View style={styles.heroCopy}>
            <Text style={[styles.heroTitle, { color: colors.textPrimary }]}>Burnout Assessment</Text>
            <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
              Answer a few questions to understand your current burnout risk.
            </Text>
          </View>
          <AssessmentIllustration />
        </View>

        <View style={styles.questions}>
          <Scale
            icon="moon"
            label="Sleep hours"
            subtitle="How many hours did you sleep last night?"
            value={sleepHours}
            min={3}
            max={10}
            valueLabel={`${sleepHours}h`}
            onChange={setSleepHours}
          />
          <Scale
            icon="pulse"
            label="Stress level"
            subtitle="How intense does your stress feel today?"
            value={stressLevel}
            min={1}
            max={10}
            valueLabel={`${stressLevel}/10`}
            onChange={setStressLevel}
          />
          <Scale
            icon="battery-half"
            label="Motivation level"
            subtitle="How available does motivation feel right now?"
            value={motivationLevel}
            min={1}
            max={10}
            valueLabel={`${motivationLevel}/10`}
            onChange={setMotivationLevel}
          />
          <Scale
            icon="eye"
            label="Focus level"
            subtitle="How steady is your attention today?"
            value={focusLevel}
            min={1}
            max={10}
            valueLabel={`${focusLevel}/10`}
            onChange={setFocusLevel}
          />
        </View>

        <Button title="Calculate burnout risk" onPress={calculate} />

        <View style={[styles.noteCard, { backgroundColor: colors.mintLight, borderColor: colors.border }]}>
          <Ionicons name="information-circle" size={18} color={colors.mintDark} />
          <Text style={[styles.noteText, { color: colors.mintDark }]}>
            This assessment is for personal insight only and is not a medical diagnosis.
          </Text>
        </View>

        {latestResult && riskStyle ? (
          <Card style={[styles.result, { backgroundColor: riskStyle.bg, borderColor: riskStyle.border }]}>
            <Text style={[styles.resultLabel, { color: riskStyle.text }]}>Latest result</Text>
            <Text style={[styles.resultTitle, { color: riskStyle.text }]}>{latestResult.riskLevel}</Text>
            <Text style={[styles.resultText, { color: colors.textSecondary }]}>Burnout score: {latestResult.burnoutScore}/100</Text>
            {latestResult.recommendations.map((item) => (
              <View key={item} style={styles.recommendationRow}>
                <Ionicons name="checkmark-circle" size={16} color={riskStyle.text} />
                <Text style={[styles.bullet, { color: colors.textPrimary }]}>{item}</Text>
              </View>
            ))}
          </Card>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function Scale({
  icon,
  label,
  subtitle,
  value,
  valueLabel,
  min,
  max,
  onChange,
}: {
  icon: IconName;
  label: string;
  subtitle: string;
  value: number;
  valueLabel: string;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  const colors = useThemeColors();
  const [trackWidth, setTrackWidth] = useState(0);
  const percent = ((value - min) / (max - min)) * 100;

  function onTrackLayout(event: LayoutChangeEvent) {
    setTrackWidth(event.nativeEvent.layout.width);
  }

  function updateFromLocation(locationX: number) {
    if (!trackWidth) {
      return;
    }
    const nextPercent = Math.max(0, Math.min(1, locationX / trackWidth));
    onChange(Math.round(min + nextPercent * (max - min)));
  }

  function handleSliderTouch(event: GestureResponderEvent) {
    updateFromLocation(event.nativeEvent.locationX);
  }

  return (
    <Card style={styles.questionCard}>
      <View style={styles.scaleHeader}>
        <View style={[styles.questionIcon, { backgroundColor: colors.mintLight }]}>
          <Ionicons name={icon} size={18} color={colors.mintDark} />
        </View>
        <View style={styles.questionCopy}>
          <Text style={[styles.scaleLabel, { color: colors.textPrimary }]}>{label}</Text>
          <Text style={[styles.scaleSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
        </View>
        <View style={[styles.valuePill, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
          <Text style={[styles.scaleValue, { color: colors.mintDark }]}>{valueLabel}</Text>
        </View>
      </View>

      <View
        onLayout={onTrackLayout}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderGrant={handleSliderTouch}
        onResponderMove={handleSliderTouch}
        style={[styles.track, { backgroundColor: colors.surfaceSecondary }]}
      >
        <View style={[styles.trackFill, { width: `${percent}%`, backgroundColor: colors.mint }]} />
        <View style={[styles.knob, { left: `${percent}%`, backgroundColor: colors.white, borderColor: colors.mint }]} />
      </View>

      <View style={styles.scaleFooter}>
        <Pressable
          onPress={() => onChange(Math.max(min, value - 1))}
          style={({ pressed }) => [
            styles.stepButton,
            { backgroundColor: colors.surfaceSecondary, borderColor: colors.border, opacity: pressed ? 0.72 : 1 },
          ]}
        >
          <Ionicons name="remove" size={18} color={colors.textPrimary} />
        </Pressable>
        <Text style={[styles.rangeLabel, { color: colors.textTertiary }]}>
          {min} - {max}
        </Text>
        <Pressable
          onPress={() => onChange(Math.min(max, value + 1))}
          style={({ pressed }) => [
            styles.stepButton,
            { backgroundColor: colors.surfaceSecondary, borderColor: colors.border, opacity: pressed ? 0.72 : 1 },
          ]}
        >
          <Ionicons name="add" size={18} color={colors.textPrimary} />
        </Pressable>
      </View>
    </Card>
  );
}

function AssessmentIllustration() {
  const colors = useThemeColors();

  return (
    <View style={[styles.illustration, { backgroundColor: colors.mintLight }]}>
      <View style={[styles.chartCard, { backgroundColor: colors.white, borderColor: colors.border }]}>
        <View style={[styles.chartBarTall, { backgroundColor: colors.mint }]} />
        <View style={[styles.chartBarMid, { backgroundColor: colors.lavender }]} />
        <View style={[styles.chartBarShort, { backgroundColor: colors.amber }]} />
      </View>
      <View style={[styles.checkBadge, { backgroundColor: colors.mint }]}>
        <Ionicons name="checkmark" size={18} color={colors.white} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { paddingBottom: 104, gap: 14 },
  hero: {
    minHeight: 124,
    borderRadius: 22,
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
  heroCopy: { flex: 1, gap: 7 },
  heroTitle: { fontSize: 24, lineHeight: 29, fontWeight: '900', letterSpacing: 0 },
  heroSubtitle: { fontSize: 14, lineHeight: 20 },
  illustration: {
    width: 96,
    height: 96,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  chartCard: {
    width: 58,
    height: 58,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 5,
    padding: 10,
    transform: [{ rotate: '-5deg' }],
  },
  chartBarTall: { width: 8, height: 34, borderRadius: 999 },
  chartBarMid: { width: 8, height: 25, borderRadius: 999 },
  chartBarShort: { width: 8, height: 17, borderRadius: 999 },
  checkBadge: { position: 'absolute', right: 14, bottom: 14, width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  questions: { gap: 12 },
  questionCard: { borderRadius: 22, padding: 16, gap: 14 },
  scaleHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  questionIcon: { width: 40, height: 40, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  questionCopy: { flex: 1, gap: 3 },
  scaleLabel: { fontSize: 16, fontWeight: '900' },
  scaleSubtitle: { fontSize: 13, lineHeight: 18 },
  valuePill: { minWidth: 58, borderRadius: 999, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 7, alignItems: 'center' },
  scaleValue: { fontWeight: '900', fontSize: 13 },
  track: { height: 12, borderRadius: 999, overflow: 'visible' },
  trackFill: { height: '100%', borderRadius: 999 },
  knob: {
    position: 'absolute',
    top: -5,
    width: 22,
    height: 22,
    marginLeft: -11,
    borderRadius: 11,
    borderWidth: 3,
    shadowColor: '#0F2921',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 3,
  },
  scaleFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  stepButton: { width: 44, height: 38, borderWidth: 1, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  rangeLabel: { flex: 1, textAlign: 'center', fontSize: 12, fontWeight: '800' },
  noteCard: { borderWidth: 1, borderRadius: 18, paddingHorizontal: 13, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', gap: 9 },
  noteText: { flex: 1, fontSize: 13, lineHeight: 19, fontWeight: '800' },
  result: { borderRadius: 22, gap: 8 },
  resultLabel: { fontSize: 12, fontWeight: '900', textTransform: 'uppercase' },
  resultTitle: { fontSize: 27, lineHeight: 32, fontWeight: '900' },
  resultText: { marginBottom: 6 },
  recommendationRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  bullet: { flex: 1, lineHeight: 21 },
});
