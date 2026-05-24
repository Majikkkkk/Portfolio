import type { CareerRole, RoleName } from "@/types";

export const ROLES: RoleName[] = [
  "QA Tester",
  "Data Analyst",
  "Software Engineer",
  "Business Analyst",
  "UI/UX Designer",
  "Cybersecurity Specialist",
  "AI/Data Specialist",
  "Prompt Engineer",
  "Web Designer",
  "Animator",
  "Project Manager",
];

export const CAREER_ROLES: CareerRole[] = [
  {
    name: "QA Tester",
    discipline: "Quality Engineering",
    signal: "detail precision, edge-case thinking, repeatable validation",
    supportingTraits: ["Software Engineer", "Cybersecurity Specialist"],
  },
  {
    name: "Data Analyst",
    discipline: "Analytics",
    signal: "pattern recognition, numerical reasoning, evidence-led decisions",
    supportingTraits: ["AI/Data Specialist", "Business Analyst"],
  },
  {
    name: "Software Engineer",
    discipline: "Software Development",
    signal: "logic, abstraction, debugging, systems thinking",
    supportingTraits: ["QA Tester", "AI/Data Specialist", "Cybersecurity Specialist"],
  },
  {
    name: "Business Analyst",
    discipline: "Product and Operations Analysis",
    signal: "requirements thinking, stakeholder communication, documentation",
    supportingTraits: ["Project Manager", "Data Analyst"],
  },
  {
    name: "UI/UX Designer",
    discipline: "User Experience",
    signal: "empathy, usability judgment, human-centered problem solving",
    supportingTraits: ["Web Designer", "Prompt Engineer"],
  },
  {
    name: "Cybersecurity Specialist",
    discipline: "Security",
    signal: "risk awareness, defensive reasoning, anomaly detection",
    supportingTraits: ["Software Engineer", "QA Tester"],
  },
  {
    name: "AI/Data Specialist",
    discipline: "Artificial Intelligence",
    signal: "experimentation, predictive reasoning, automation thinking",
    supportingTraits: ["Data Analyst", "Prompt Engineer", "Software Engineer"],
  },
  {
    name: "Prompt Engineer",
    discipline: "AI Interaction Design",
    signal: "instruction design, output refinement, structured natural language",
    supportingTraits: ["AI/Data Specialist", "UI/UX Designer"],
  },
  {
    name: "Web Designer",
    discipline: "Digital Design",
    signal: "visual hierarchy, responsive layout, aesthetics",
    supportingTraits: ["UI/UX Designer", "Animator"],
  },
  {
    name: "Animator",
    discipline: "Motion and Visual Storytelling",
    signal: "motion timing, visual imagination, narrative sequencing",
    supportingTraits: ["Web Designer"],
  },
  {
    name: "Project Manager",
    discipline: "Delivery Leadership",
    signal: "planning, prioritization, coordination, leadership",
    supportingTraits: ["Business Analyst"],
  },
];

export const ROLE_BY_NAME = Object.fromEntries(CAREER_ROLES.map((role) => [role.name, role])) as Record<
  RoleName,
  CareerRole
>;
