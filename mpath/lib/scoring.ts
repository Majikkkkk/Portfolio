import { CAREER_ROLES, ROLES } from "@/data/careerRoles";
import { SCORING_WEIGHTS } from "@/data/scoringWeights";
import type { AnswerMap, AssessmentResult, Question, RoleName, RoleScores, ScoringBreakdown } from "@/types";
import { clamp } from "./helpers";

function emptyScores(): RoleScores {
  return Object.fromEntries(ROLES.map((role) => [role, 0]));
}

export function scoreAssessment(questions: Question[], answers: AnswerMap): ScoringBreakdown {
  const raw = emptyScores();
  const maximum = emptyScores();

  questions.forEach((question) => {
    const answer = answers[question.id];
    if (!answer) return;

    const effectiveAnswer = question.reversed ? 8 - answer : answer;
    const weight = Math.abs(question.weight);

    raw[question.role] += (effectiveAnswer - 1) * weight;
    maximum[question.role] += 6 * weight;
  });

  const primary = emptyScores();
  ROLES.forEach((role) => {
    primary[role] = maximum[role] > 0 ? clamp((raw[role] / maximum[role]) * 100) : 0;
  });

  const secondary = emptyScores();
  CAREER_ROLES.forEach((role) => {
    const related = role.supportingTraits;
    const relatedAverage = related.length
      ? related.reduce((sum, name) => sum + primary[name], 0) / related.length
      : primary[role.name];
    secondary[role.name] = relatedAverage;
  });

  const consistency = calculateConsistencyScores(questions, answers, primary);
  const total = emptyScores();

  ROLES.forEach((role) => {
    total[role] =
      primary[role] * SCORING_WEIGHTS.primaryAptitude +
      secondary[role] * SCORING_WEIGHTS.secondaryTraits +
      consistency[role] * SCORING_WEIGHTS.consistencyPattern;
  });

  return { primary, secondary, consistency, total };
}

export function determineFinalRole(breakdown: ScoringBreakdown): RoleName {
  const sorted = [...ROLES].sort((a, b) => breakdown.total[b] - breakdown.total[a]);
  const [top, second] = sorted;

  if (breakdown.total[top] - breakdown.total[second] >= SCORING_WEIGHTS.tieBreakGap) {
    return top;
  }

  return [...sorted].sort((a, b) => {
    const primaryGap = breakdown.primary[b] - breakdown.primary[a];
    if (Math.abs(primaryGap) > 0.5) return primaryGap;
    return ROLES.indexOf(a) - ROLES.indexOf(b);
  })[0];
}

export function buildAssessmentResult(questions: Question[], answers: AnswerMap): AssessmentResult {
  const breakdown = scoreAssessment(questions, answers);
  const finalRole = determineFinalRole(breakdown);
  const confidence = clamp(breakdown.total[finalRole]);

  return {
    finalRole,
    confidence,
    explanation: buildPersonalizedExplanation(finalRole, breakdown),
    detectedStrengths: detectStrengths(finalRole, breakdown),
    improvementFocus: detectImprovementFocus(finalRole, breakdown),
    completedAt: new Date().toISOString(),
  };
}

function calculateConsistencyScores(questions: Question[], answers: AnswerMap, primary: RoleScores): RoleScores {
  const consistency = emptyScores();
  const answeredValues = Object.values(answers);
  const neutralRatio = answeredValues.length
    ? answeredValues.filter((value) => value === 4).length / answeredValues.length
    : 1;

  ROLES.forEach((role) => {
    const roleAnswers = questions
      .filter((question) => question.role === role && answers[question.id])
      .map((question) => (question.reversed ? 8 - answers[question.id] : answers[question.id]));
    const mean = roleAnswers.length ? roleAnswers.reduce((sum, value) => sum + value, 0) / roleAnswers.length : 4;
    const variance = roleAnswers.length
      ? roleAnswers.reduce((sum, value) => sum + Math.abs(value - mean), 0) / roleAnswers.length
      : 3;
    const decisiveness = clamp((1 - neutralRatio) * 100);
    const roleConsistency = clamp(100 - variance * 18);
    consistency[role] = roleConsistency * 0.7 + decisiveness * 0.3 + primary[role] * 0.05;
  });

  return consistency;
}

function buildPersonalizedExplanation(role: RoleName, breakdown: ScoringBreakdown) {
  const strongestDimension =
    breakdown.primary[role] >= breakdown.secondary[role] ? "direct role aptitude" : "supporting career traits";
  const consistencySignal = breakdown.consistency[role] > 70 ? "consistent" : "developing";

  return `Your response pattern shows ${strongestDimension} for ${role}, with a ${consistencySignal} preference profile across work habits, problem-solving behavior, and technical compatibility. The system selected one final match because this role had the strongest combined score across primary aptitude, adjacent supporting traits, and answer consistency.`;
}

function detectStrengths(role: RoleName, breakdown: ScoringBreakdown) {
  const signals = [
    breakdown.primary[role] >= 70 ? "Strong direct aptitude signals" : "Emerging aptitude signals",
    breakdown.secondary[role] >= 65 ? "Useful adjacent technology traits" : "Focused role-specific fit",
    breakdown.consistency[role] >= 70 ? "Consistent workplace preference pattern" : "Flexible but less concentrated response pattern",
  ];

  return signals;
}

function detectImprovementFocus(role: RoleName, breakdown: ScoringBreakdown) {
  const focus = [];
  if (breakdown.primary[role] < 70) focus.push("Build more hands-on practice in the core responsibilities of this role.");
  if (breakdown.secondary[role] < 65) focus.push("Strengthen adjacent skills that support cross-functional technology work.");
  if (breakdown.consistency[role] < 70) focus.push("Clarify your preferred work style through projects, internships, or guided practice.");
  return focus.length ? focus : ["Continue building depth through portfolio projects and real-world practice."];
}
