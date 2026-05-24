export const SCORING_WEIGHTS = {
  primaryAptitude: 0.7,
  secondaryTraits: 0.2,
  consistencyPattern: 0.1,
  secondaryInfluence: 0.15,
  neutralCompressionThreshold: 0.4,
  neutralCompression: 0.12,
  targetQuestionCount: 200,
  tieBreakGap: 2,
} as const;

export const LIKERT_OPTIONS = [
  { value: 1, label: "Strongly Disagree", shortLabel: "Strongly disagree" },
  { value: 2, label: "Disagree", shortLabel: "Disagree" },
  { value: 3, label: "Slightly Disagree", shortLabel: "Slightly disagree" },
  { value: 4, label: "Neutral", shortLabel: "Neutral" },
  { value: 5, label: "Slightly Agree", shortLabel: "Slightly agree" },
  { value: 6, label: "Agree", shortLabel: "Agree" },
  { value: 7, label: "Strongly Agree", shortLabel: "Strongly agree" },
] as const;
