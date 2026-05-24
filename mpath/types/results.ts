import type { RoleName } from "./role";

export interface RoadmapStep {
  phase: string;
  description: string;
}

export interface RoleResult {
  summary: string;
  strengths: string[];
  areasToImprove: string[];
  responsibilities: string[];
  skills: string[];
  tools: string[];
  roadmap: RoadmapStep[];
  growthPath: string;
  icon: string;
}

export type RoleResultMap = Record<RoleName, RoleResult>;

export interface AssessmentResult {
  finalRole: RoleName;
  confidence: number;
  explanation: string;
  detectedStrengths: string[];
  improvementFocus: string[];
  completedAt: string;
}
