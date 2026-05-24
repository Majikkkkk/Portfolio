export function calculateProgress(currentIndex: number, total: number) {
  if (total <= 0) return 0;
  return Math.round(((currentIndex + 1) / total) * 100);
}
