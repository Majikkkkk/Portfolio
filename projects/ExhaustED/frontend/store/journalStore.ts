import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { JournalEntry } from '@/types';

interface JournalState {
  activeUserKey: string;
  entriesByUser: Record<string, JournalEntry[]>;
  entries: JournalEntry[];
  setActiveUser: (userKey: string) => void;
  resetForOnlyUser: (userKey: string) => void;
  addEntry: (input: { title: string; content: string; mood?: string }) => JournalEntry;
  updateEntry: (id: string, input: { title: string; content: string; mood?: string }) => void;
  deleteEntry: (id: string) => void;
}

const defaultUserKey = 'guest';

function entriesFor(state: JournalState, userKey = state.activeUserKey): JournalEntry[] {
  return state.entriesByUser[userKey] ?? [];
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set, get) => ({
      activeUserKey: defaultUserKey,
      entriesByUser: { [defaultUserKey]: [] },
      entries: [],
      setActiveUser: (userKey) =>
        set((state) => {
          const entries = state.entriesByUser[userKey] ?? [];
          return {
            activeUserKey: userKey,
            entriesByUser: { ...state.entriesByUser, [userKey]: entries },
            entries,
          };
        }),
      resetForOnlyUser: (userKey) =>
        set(() => ({
          activeUserKey: userKey,
          entriesByUser: { [userKey]: [] },
          entries: [],
        })),
      addEntry: (input) => {
        const now = new Date().toISOString();
        const entry: JournalEntry = {
          id: `journal-${Date.now()}`,
          title: input.title.trim(),
          content: input.content.trim(),
          mood: input.mood,
          date: now,
          updatedAt: now,
        };

        set((state) => {
          const entries = [entry, ...entriesFor(state)];
          return {
            entriesByUser: { ...state.entriesByUser, [state.activeUserKey]: entries },
            entries,
          };
        });

        return entry;
      },
      updateEntry: (id, input) =>
        set((state) => {
          const entries = entriesFor(state).map((entry) =>
            entry.id === id
              ? {
                  ...entry,
                  title: input.title.trim(),
                  content: input.content.trim(),
                  mood: input.mood,
                  updatedAt: new Date().toISOString(),
                }
              : entry
          );

          return {
            entriesByUser: { ...state.entriesByUser, [state.activeUserKey]: entries },
            entries,
          };
        }),
      deleteEntry: (id) =>
        set((state) => {
          const entries = entriesFor(state).filter((entry) => entry.id !== id);
          return {
            entriesByUser: { ...state.entriesByUser, [state.activeUserKey]: entries },
            entries,
          };
        }),
    }),
    {
      name: 'exhausted_journal_marjinel_v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        activeUserKey: state.activeUserKey,
        entriesByUser: state.entriesByUser,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        state.entries = state.entriesByUser[state.activeUserKey] ?? [];
      },
    }
  )
);
