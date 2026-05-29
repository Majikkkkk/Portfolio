import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { AssessmentResult, DailyCheckin, RiskLevel } from '@/types';

interface UserAssessmentBucket {
  latestResult: AssessmentResult | null;
  history: AssessmentResult[];
  checkins: DailyCheckin[];
}

interface AssessmentState extends UserAssessmentBucket {
  activeUserKey: string;
  byUser: Record<string, UserAssessmentBucket>;
  setActiveUser: (userKey: string) => void;
  resetForOnlyUser: (userKey: string) => void;
  hasCheckedInToday: () => boolean;
  submitAssessment: (input: {
    sleepHours: number;
    stressLevel: number;
    motivationLevel: number;
    focusLevel: number;
  }) => AssessmentResult;
  addCheckin: (input: Omit<DailyCheckin, 'date' | 'wellnessScore'>) => DailyCheckin;
}

const defaultUserKey = 'guest';

const emptyBucket = (): UserAssessmentBucket => ({
  latestResult: null,
  history: [],
  checkins: [],
});

function getRiskLevel(score: number): RiskLevel {
  if (score < 35) return 'Low Risk';
  if (score < 60) return 'Moderate Risk';
  if (score < 80) return 'High Risk';
  return 'Severe Burnout';
}

function getBucket(state: AssessmentState, userKey = state.activeUserKey): UserAssessmentBucket {
  return state.byUser[userKey] ?? emptyBucket();
}

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set, get) => ({
      activeUserKey: defaultUserKey,
      byUser: { [defaultUserKey]: emptyBucket() },
      ...emptyBucket(),
      setActiveUser: (userKey) =>
        set((state) => {
          const bucket = state.byUser[userKey] ?? emptyBucket();
          return {
            activeUserKey: userKey,
            byUser: { ...state.byUser, [userKey]: bucket },
            latestResult: bucket.latestResult,
            history: bucket.history,
            checkins: bucket.checkins,
          };
        }),
      resetForOnlyUser: (userKey) =>
        set(() => {
          const bucket = emptyBucket();
          return {
            activeUserKey: userKey,
            byUser: { [userKey]: bucket },
            latestResult: bucket.latestResult,
            history: bucket.history,
            checkins: bucket.checkins,
          };
        }),
      hasCheckedInToday: () => {
        const today = new Date().toDateString();
        return get().checkins.some((checkin) => new Date(checkin.date).toDateString() === today);
      },
      submitAssessment: ({ sleepHours, stressLevel, motivationLevel, focusLevel }) => {
        const sleepRisk = Math.max(0, 8 - sleepHours) * 8;
        const stressRisk = stressLevel * 7;
        const motivationRisk = Math.max(0, 10 - motivationLevel) * 4;
        const focusRisk = Math.max(0, 10 - focusLevel) * 3;
        const burnoutScore = Math.min(100, Math.round(sleepRisk + stressRisk + motivationRisk + focusRisk));
        const riskLevel = getRiskLevel(burnoutScore);

        const result: AssessmentResult = {
          burnoutScore,
          riskLevel,
          recommendations: [
            sleepHours < 7 ? 'Protect a realistic sleep window tonight before adding more tasks.' : 'Keep protecting the sleep rhythm that is helping you recover.',
            stressLevel > 6 ? 'Choose one academic task and reduce it to a 25-minute focus block.' : 'Keep using the stress habits that are helping you stay steady.',
            motivationLevel < 5 ? 'Start with a very small task so momentum does not depend on feeling ready.' : 'Use your current momentum on the highest-impact task first.',
          ],
          insights: [
            `Your stress and recovery inputs currently point to a ${riskLevel.toLowerCase()} profile.`,
            'This is a wellness guide, not a medical diagnosis.',
          ],
          createdAt: new Date().toISOString(),
        };

        set((state) => {
          const bucket = getBucket(state);
          const nextBucket = { ...bucket, latestResult: result, history: [result, ...bucket.history] };
          return {
            byUser: { ...state.byUser, [state.activeUserKey]: nextBucket },
            latestResult: nextBucket.latestResult,
            history: nextBucket.history,
            checkins: nextBucket.checkins,
          };
        });

        return result;
      },
      addCheckin: (input) => {
        const today = new Date().toDateString();
        if (get().checkins.some((checkin) => new Date(checkin.date).toDateString() === today)) {
          throw new Error('You already checked in today. Come back tomorrow for a fresh check-in.');
        }

        const wellnessScore = Math.max(
          0,
          Math.min(100, Math.round(input.sleepHours * 8 + input.motivationLevel * 5 - input.stressLevel * 4 + 30))
        );
        const checkin: DailyCheckin = { ...input, wellnessScore, date: new Date().toISOString() };

        set((state) => {
          const bucket = getBucket(state);
          const nextBucket = { ...bucket, checkins: [checkin, ...bucket.checkins] };
          return {
            byUser: { ...state.byUser, [state.activeUserKey]: nextBucket },
            latestResult: nextBucket.latestResult,
            history: nextBucket.history,
            checkins: nextBucket.checkins,
          };
        });

        return checkin;
      },
    }),
    {
      name: 'exhausted_assessments_marjinel_v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        activeUserKey: state.activeUserKey,
        byUser: state.byUser,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const bucket = state.byUser[state.activeUserKey] ?? emptyBucket();
        state.latestResult = bucket.latestResult;
        state.history = bucket.history;
        state.checkins = bucket.checkins;
      },
    }
  )
);
