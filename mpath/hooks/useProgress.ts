import { calculateProgress } from "@/utils/calculateProgress";

export function useProgress(currentIndex: number, total: number) {
  return calculateProgress(currentIndex, total);
}
