export type RoleName =
  | "QA Tester"
  | "Data Analyst"
  | "Software Engineer"
  | "Business Analyst"
  | "UI/UX Designer"
  | "Cybersecurity Specialist"
  | "AI/Data Specialist"
  | "Prompt Engineer"
  | "Web Designer"
  | "Animator"
  | "Project Manager";

export interface CareerRole {
  name: RoleName;
  discipline: string;
  signal: string;
  supportingTraits: RoleName[];
}
