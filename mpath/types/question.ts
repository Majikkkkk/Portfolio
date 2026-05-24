import type { RoleName } from "./role";

export interface Question {
  id: string;
  text: string;
  role: RoleName;
  weight: number;
  reversed: boolean;
}

export interface LikertOption {
  value: number;
  label: string;
  shortLabel: string;
}
