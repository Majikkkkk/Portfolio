"use client";

import { useAssessmentStore } from "@/store/assessmentStore";

export function useAssessment() {
  return useAssessmentStore();
}
