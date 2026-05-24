import { QUESTION_BANK } from "@/data/questions";
import { SCORING_WEIGHTS } from "@/data/scoringWeights";
import type { AnswerMap, AssessmentResult, Question } from "@/types";
import { buildBalancedQuestionSet } from "./randomizer";
import { buildAssessmentResult } from "./scoring";

export function createAssessmentQuestions(): Question[] {
  return buildBalancedQuestionSet(QUESTION_BANK, SCORING_WEIGHTS.targetQuestionCount);
}

export function completeAssessment(questions: Question[], answers: AnswerMap): AssessmentResult {
  return buildAssessmentResult(questions, answers);
}
