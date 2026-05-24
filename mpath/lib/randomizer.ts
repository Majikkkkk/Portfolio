import type { Question, RoleName } from "@/types";
import { ROLES } from "@/data/careerRoles";

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

export function buildBalancedQuestionSet(questions: Question[], targetCount: number): Question[] {
  const byRole = ROLES.reduce((acc, role) => {
    acc[role] = [];
    return acc;
  }, {} as Record<RoleName, Question[]>);

  questions.forEach((question) => {
    byRole[question.role]?.push(question);
  });

  const shuffledPools = ROLES.reduce((acc, role) => {
    acc[role] = shuffle(byRole[role]);
    return acc;
  }, {} as Record<RoleName, Question[]>);

  const perRole = Math.max(1, Math.floor(targetCount / ROLES.length));
  const selected: Question[] = [];

  ROLES.forEach((role) => {
    selected.push(...shuffledPools[role].slice(0, perRole));
  });

  let cursor = 0;
  while (selected.length < targetCount && cursor < ROLES.length * 4) {
    const role = ROLES[cursor % ROLES.length];
    const candidate = shuffledPools[role][perRole + Math.floor(cursor / ROLES.length)];
    if (candidate && !selected.some((question) => question.id === candidate.id)) {
      selected.push(candidate);
    }
    cursor += 1;
  }

  return shuffle(selected);
}
