"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createAssessmentQuestions, completeAssessment } from "@/lib/assessmentEngine";
import type { AnswerMap, AssessmentResult, Question } from "@/types";

interface AssessmentStore {
  questions: Question[];
  currentIndex: number;
  answers: AnswerMap;
  startedAt: string | null;
  completedAt: string | null;
  result: AssessmentResult | null;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  startAssessment: () => void;
  resumeAssessment: () => void;
  answerCurrentQuestion: (value: number) => void;
  goBack: () => void;
  goNext: () => void;
  restartAssessment: () => void;
  completeCurrentAssessment: () => AssessmentResult | null;
}

const initialState = {
  questions: [],
  currentIndex: 0,
  answers: {},
  startedAt: null,
  completedAt: null,
  result: null,
};

export const useAssessmentStore = create<AssessmentStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      startAssessment: () =>
        set({
          questions: createAssessmentQuestions(),
          currentIndex: 0,
          answers: {},
          startedAt: new Date().toISOString(),
          completedAt: null,
          result: null,
        }),
      resumeAssessment: () => {
        const state = get();
        if (!state.questions.length || state.result) state.startAssessment();
      },
      answerCurrentQuestion: (value) => {
        const { questions, currentIndex, answers } = get();
        const question = questions[currentIndex];
        if (!question) return;

        set({
          answers: {
            ...answers,
            [question.id]: value,
          },
        });
      },
      goBack: () => set((state) => ({ currentIndex: Math.max(0, state.currentIndex - 1) })),
      goNext: () =>
        set((state) => ({
          currentIndex: Math.min(state.questions.length - 1, state.currentIndex + 1),
        })),
      restartAssessment: () =>
        set({
          ...initialState,
          questions: createAssessmentQuestions(),
          startedAt: new Date().toISOString(),
        }),
      completeCurrentAssessment: () => {
        const { questions, answers } = get();
        if (!questions.length) return null;

        const result = completeAssessment(questions, answers);
        set({
          result,
          completedAt: result.completedAt,
          currentIndex: questions.length - 1,
        });
        return result;
      },
    }),
    {
      name: "mpath-assessment-session",
      partialize: (state) => ({
        questions: state.questions,
        currentIndex: state.currentIndex,
        answers: state.answers,
        startedAt: state.startedAt,
        completedAt: state.completedAt,
        result: state.result,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
