import type { Question } from "./question";
import type { AssessmentResult } from "./results";

export type AnswerMap = Record<string, number>;

export interface RoleScores {
  [key: string]: number;
}

export interface AssessmentSession {
  questions: Question[];
  currentIndex: number;
  answers: AnswerMap;
  startedAt: string | null;
  completedAt: string | null;
  result: AssessmentResult | null;
}

export interface ScoringBreakdown {
  primary: RoleScores;
  secondary: RoleScores;
  consistency: RoleScores;
  total: RoleScores;
}
