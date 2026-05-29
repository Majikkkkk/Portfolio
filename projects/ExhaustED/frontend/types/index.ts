export interface User {
  _id: string;
  fullName: string;
  email: string;
  studentId: string;
  program: string;
  yearLevel: number;
  gradeLevel?: string;
  age?: number | null;
  school?: string;
  profileImageUri?: string;
  notificationPreferences?: NotificationPreferences;
  privacyPreferences?: PrivacyPreferences;
  wellnessPreferences?: WellnessPreferences;
  createdAt: string;
}

export interface NotificationPreferences {
  enabled: boolean;
  dailyCheckin: boolean;
  studyBreaks: boolean;
  hydration: boolean;
  sleep: boolean;
}

export interface PrivacyPreferences {
  anonymousCommunity: boolean;
  saveChatHistory: boolean;
  localOnlyMode: boolean;
}

export interface WellnessPreferences {
  remindersEnabled: boolean;
  reminderTime: string;
  language: 'English';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  fullName: string;
  studentId: string;
  program: string;
  yearLevel: number;
  confirmPassword: string;
}

export type RiskLevel = 'Low Risk' | 'Moderate Risk' | 'High Risk' | 'Severe Burnout';

export interface AssessmentResult {
  burnoutScore: number;
  riskLevel: RiskLevel;
  recommendations: string[];
  insights: string[];
  createdAt: string;
}

export interface DailyCheckin {
  mood: string;
  sleepHours: number;
  stressLevel: number;
  motivationLevel: number;
  wellnessScore: number;
  date: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood?: string;
  date: string;
  updatedAt: string;
}

export interface CommunityComment {
  id: string;
  content: string;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  content: string;
  mood?: string;
  createdAt: string;
  comments: CommunityComment[];
}
