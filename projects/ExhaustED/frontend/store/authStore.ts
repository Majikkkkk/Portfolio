import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { authApi, userApi } from '@/services/api';
import { useAssessmentStore } from '@/store/assessmentStore';
import { useChatbotStore } from '@/store/chatbotStore';
import { useCommunityStore } from '@/store/communityStore';
import { useJournalStore } from '@/store/journalStore';
import type {
  LoginCredentials,
  NotificationPreferences,
  PrivacyPreferences,
  RegisterData,
  User,
  WellnessPreferences,
} from '@/types';

interface AuthState {
  user: User | null;
  profilesByEmail: Record<string, User>;
  localPasswordsByEmail: Record<string, string>;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  updateProfile: (data: Partial<Pick<User, 'fullName' | 'gradeLevel' | 'age' | 'school' | 'program' | 'profileImageUri'>>) => Promise<void>;
  updateNotifications: (data: Partial<NotificationPreferences>) => Promise<void>;
  updatePrivacy: (data: Partial<PrivacyPreferences>) => Promise<void>;
  updateWellness: (data: Partial<WellnessPreferences>) => Promise<void>;
  changePassword: (input: { currentPassword: string; newPassword: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const normalizeEmail = (email: string) => email.trim().toLowerCase();
const preservedEmail = 'marjinel@gmail.com';
const preservedPassword = '1234567789';
const preservedUserKey = `local-${preservedEmail}`;

const defaultNotifications = (): NotificationPreferences => ({
  enabled: true,
  dailyCheckin: true,
  studyBreaks: true,
  hydration: false,
  sleep: true,
});

const defaultPrivacy = (): PrivacyPreferences => ({
  anonymousCommunity: true,
  saveChatHistory: true,
  localOnlyMode: false,
});

const defaultWellness = (): WellnessPreferences => ({
  remindersEnabled: true,
  reminderTime: '20:00',
  language: 'English',
});

const userKey = (user: User | null) => user?._id || user?.email || 'guest';

const withDefaults = (user: User): User => ({
  ...user,
  notificationPreferences: { ...defaultNotifications(), ...(user.notificationPreferences ?? {}) },
  privacyPreferences: { ...defaultPrivacy(), ...(user.privacyPreferences ?? {}) },
  wellnessPreferences: { ...defaultWellness(), ...(user.wellnessPreferences ?? {}) },
});

const demoUser = (email: string, fullName = 'Student'): User => {
  const normalizedEmail = normalizeEmail(email);
  const preserved = normalizedEmail === preservedEmail;

  return withDefaults({
    _id: `local-${normalizedEmail}`,
    fullName: preserved ? 'Marjinel' : fullName,
    email: normalizedEmail,
    studentId: `LOCAL-${normalizedEmail}`,
    program: preserved ? 'Student Wellness' : 'Computer Science',
    yearLevel: 3,
    gradeLevel: 'College',
    age: null,
    school: '',
    profileImageUri: '',
    createdAt: new Date().toISOString(),
  });
};

function activateUserData(user: User | null) {
  const key = userKey(user);
  useAssessmentStore.getState().setActiveUser(key);
  useChatbotStore.getState().setActiveUser(key);
  useJournalStore.getState().setActiveUser(key);
}

function resetLocalDataForMarjinel() {
  useAssessmentStore.getState().resetForOnlyUser(preservedUserKey);
  useChatbotStore.getState().resetForOnlyUser(preservedUserKey);
  useJournalStore.getState().resetForOnlyUser(preservedUserKey);
  useCommunityStore.getState().clearPosts();
}

function readApiUser(response: unknown): User | null {
  const maybe = response as { data?: { data?: { user?: User; token?: string } } };
  return maybe.data?.data?.user ? withDefaults(maybe.data.data.user) : null;
}

function readApiToken(response: unknown): string | null {
  const maybe = response as { data?: { data?: { token?: string } } };
  return maybe.data?.data?.token ?? null;
}

function ensurePassword(password: string) {
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters.');
  }
}

function ensureStrongPassword(password: string) {
  ensurePassword(password);
  if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    throw new Error('Password must include at least one uppercase letter and one number.');
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profilesByEmail: {},
      localPasswordsByEmail: {},
      isAuthenticated: false,
      login: async (credentials) => {
        const email = normalizeEmail(credentials.email);
        if (!email || !credentials.password) {
          throw new Error('Email and password are required.');
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
          throw new Error('Enter a valid email address.');
        }
        if (email === preservedEmail && credentials.password === preservedPassword) {
          const user = demoUser(preservedEmail, 'Marjinel');
          activateUserData(user);
          set(() => ({
            user,
            isAuthenticated: true,
            profilesByEmail: { [preservedEmail]: user },
            localPasswordsByEmail: { [preservedEmail]: preservedPassword },
          }));
          return;
        }

        try {
          const response = await authApi.login({ email, password: credentials.password });
          const apiUser = readApiUser(response);
          const token = readApiToken(response);
          if (token) await AsyncStorage.setItem('exhausted_token', token);
          if (apiUser) {
            activateUserData(apiUser);
            set((state) => ({
              user: apiUser,
              isAuthenticated: true,
              profilesByEmail: { ...state.profilesByEmail, [email]: apiUser },
            }));
            return;
          }
        } catch {
          const savedPassword = get().localPasswordsByEmail[email];
          if (savedPassword && savedPassword !== credentials.password) {
            throw new Error('Invalid email or password.');
          }
        }

        const existingProfile = get().profilesByEmail[email];
        const user = existingProfile ?? demoUser(email, 'Student');
        activateUserData(user);
        set((state) => ({
          user,
          isAuthenticated: true,
          profilesByEmail: { ...state.profilesByEmail, [email]: user },
          localPasswordsByEmail: { ...state.localPasswordsByEmail, [email]: credentials.password },
        }));
      },
      register: async (data) => {
        const email = normalizeEmail(data.email);
        if (!data.fullName.trim() || !email || !data.password) {
          throw new Error('Please complete the required fields.');
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
          throw new Error('Enter a valid email address.');
        }
        ensurePassword(data.password);
        if (data.confirmPassword && data.password !== data.confirmPassword) {
          throw new Error('Passwords do not match.');
        }

        try {
          const response = await authApi.register({ ...data, email });
          const apiUser = readApiUser(response);
          const token = readApiToken(response);
          if (token) await AsyncStorage.setItem('exhausted_token', token);
          if (apiUser) {
            activateUserData(apiUser);
            set((state) => ({
              user: apiUser,
              isAuthenticated: true,
              profilesByEmail: { ...state.profilesByEmail, [email]: apiUser },
              localPasswordsByEmail: { ...state.localPasswordsByEmail, [email]: data.password },
            }));
            return;
          }
        } catch {
          // Local mode keeps the app usable when the API is unavailable during mobile testing.
        }

        const user = demoUser(email, data.fullName.trim());
        activateUserData(user);
        set((state) => ({
          user,
          isAuthenticated: true,
          profilesByEmail: { ...state.profilesByEmail, [email]: user },
          localPasswordsByEmail: { ...state.localPasswordsByEmail, [email]: data.password },
        }));
      },
      updateProfile: async (data) => {
        const state = get();
        if (!state.user) return;

        const nextUser = withDefaults({
          ...state.user,
          ...data,
          fullName: data.fullName?.trim() || state.user.fullName,
          age: typeof data.age === 'number' && Number.isFinite(data.age) ? data.age : data.age === null ? null : state.user.age,
        });

        set((current) => ({
          user: nextUser,
          profilesByEmail: { ...current.profilesByEmail, [nextUser.email]: nextUser },
        }));

        if (!nextUser._id.startsWith('local-')) {
          try {
            const response = await userApi.updateProfile(data);
            const apiUser = readApiUser(response);
            if (apiUser) {
              set((current) => ({
                user: apiUser,
                profilesByEmail: { ...current.profilesByEmail, [apiUser.email]: apiUser },
              }));
            }
          } catch {
            // Keep optimistic local profile so the mobile app remains responsive offline.
          }
        }
      },
      updateNotifications: async (data) => {
        const user = get().user;
        if (!user) return;
        const nextUser = withDefaults({
          ...user,
          notificationPreferences: { ...defaultNotifications(), ...(user.notificationPreferences ?? {}), ...data },
        });
        set((state) => ({ user: nextUser, profilesByEmail: { ...state.profilesByEmail, [nextUser.email]: nextUser } }));
        if (!nextUser._id.startsWith('local-')) {
          try {
            await userApi.updateNotifications(nextUser.notificationPreferences ?? {});
          } catch {}
        }
      },
      updatePrivacy: async (data) => {
        const user = get().user;
        if (!user) return;
        const nextUser = withDefaults({
          ...user,
          privacyPreferences: { ...defaultPrivacy(), ...(user.privacyPreferences ?? {}), ...data },
        });
        set((state) => ({ user: nextUser, profilesByEmail: { ...state.profilesByEmail, [nextUser.email]: nextUser } }));
        if (!nextUser._id.startsWith('local-')) {
          try {
            await userApi.updatePrivacy(nextUser.privacyPreferences ?? {});
          } catch {}
        }
      },
      updateWellness: async (data) => {
        const user = get().user;
        if (!user) return;
        const nextUser = withDefaults({
          ...user,
          wellnessPreferences: { ...defaultWellness(), ...(user.wellnessPreferences ?? {}), ...data, language: 'English' },
        });
        set((state) => ({ user: nextUser, profilesByEmail: { ...state.profilesByEmail, [nextUser.email]: nextUser } }));
        if (!nextUser._id.startsWith('local-')) {
          try {
            await userApi.updateWellness(nextUser.wellnessPreferences ?? {});
          } catch {}
        }
      },
      changePassword: async ({ currentPassword, newPassword }) => {
        const user = get().user;
        if (!user) throw new Error('You need to be signed in.');
        ensureStrongPassword(newPassword);
        const savedPassword = get().localPasswordsByEmail[user.email];
        if (savedPassword && savedPassword !== currentPassword) {
          throw new Error('Current password is incorrect.');
        }
        if (!user._id.startsWith('local-')) {
          await authApi.changePassword({ currentPassword, newPassword });
        }
        set((state) => ({
          localPasswordsByEmail: { ...state.localPasswordsByEmail, [user.email]: newPassword },
        }));
      },
      logout: async () => {
        await AsyncStorage.multiRemove(['exhausted_token', 'exhausted_user', 'mbalance_token', 'mbalance_user']);
        activateUserData(null);
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'exhausted_auth_marjinel_v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        profilesByEmail: state.profilesByEmail,
        localPasswordsByEmail: state.localPasswordsByEmail,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const preservedUser = demoUser(preservedEmail, 'Marjinel');
        const shouldReset =
          Object.keys(state.profilesByEmail ?? {}).some((email) => normalizeEmail(email) !== preservedEmail) ||
          Object.keys(state.localPasswordsByEmail ?? {}).some((email) => normalizeEmail(email) !== preservedEmail) ||
          state.user?.email !== preservedEmail;

        state.profilesByEmail = { [preservedEmail]: preservedUser };
        state.localPasswordsByEmail = { [preservedEmail]: preservedPassword };

        if (state.user?.email === preservedEmail) {
          state.user = withDefaults({ ...preservedUser, ...state.user, fullName: state.user.fullName || 'Marjinel' });
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }

        if (shouldReset) {
          resetLocalDataForMarjinel();
        }

        activateUserData(state?.user ?? null);
      },
    }
  )
);
