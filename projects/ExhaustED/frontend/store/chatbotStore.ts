import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { ChatMessage } from '@/types';

type Emotion =
  | 'academic_pressure'
  | 'anxiety'
  | 'burnout'
  | 'exhaustion'
  | 'loneliness'
  | 'sadness'
  | 'stuck'
  | 'okay';

interface ChatbotState {
  activeUserKey: string;
  messagesByUser: Record<string, ChatMessage[]>;
  isTyping: boolean;
  messages: ChatMessage[];
  setActiveUser: (userKey: string) => void;
  resetForOnlyUser: (userKey: string) => void;
  sendMessage: (content: string) => void;
  clear: () => void;
}

const defaultUserKey = 'guest';

const starter = (): ChatMessage => ({
  id: `majik-starter-${Date.now()}`,
  role: 'assistant',
  content:
    "Hi, I'm Majik. You can talk here without making it sound neat first. What has been feeling heavy lately?",
  createdAt: new Date().toISOString(),
});

const emotionKeywords: Record<Emotion, string[]> = {
  academic_pressure: ['exam', 'quiz', 'test', 'deadline', 'assignment', 'project', 'grades', 'schoolwork', 'study'],
  anxiety: ['anxious', 'anxiety', 'panic', 'worried', 'worry', 'nervous', 'scared', 'overthinking', 'dread'],
  burnout: ['burnout', 'burned out', 'burnt out', 'giving up', 'breaking point', 'falling apart', 'hopeless'],
  exhaustion: ['tired', 'exhausted', 'drained', 'sleepy', 'fatigue', 'no energy', 'worn out', 'sleep'],
  loneliness: ['lonely', 'alone', 'isolated', 'no friends', 'ignored', 'left out', 'by myself'],
  sadness: ['sad', 'crying', 'empty', 'depressed', 'miserable', 'numb', 'hurt', 'heavy'],
  stuck: ['unmotivated', 'lazy', 'procrastinating', 'stuck', "can't focus", 'distracted', 'behind'],
  okay: ['okay', 'fine', 'alright', 'good', 'better', 'managing'],
};

const responseOpeners: Record<Emotion, string[]> = {
  academic_pressure: [
    'That sounds like a lot of pressure to carry, especially when school keeps asking for more before you have had time to recover.',
    'It makes sense that your mind feels crowded if deadlines or grades have been sitting on your chest.',
    'School pressure can start to feel personal, even when it is really a load problem, not a worth problem.',
  ],
  anxiety: [
    'That sounds really unsettling, like your brain is trying to protect you by running through every possible problem.',
    'Anxiety can make the future feel like it is already happening. No wonder your body feels on alert.',
    'That kind of worry can be exhausting because it does not always switch off when you want it to.',
  ],
  burnout: [
    'That sounds deeper than ordinary tiredness. It sounds like you have been pushing past your limits for a while.',
    'Burnout can make even simple things feel far away. That does not mean you are weak; it means your system needs care.',
    'If you are at the point where everything feels too much, we should treat that seriously and gently.',
  ],
  exhaustion: [
    'You seem drained, like your body has been asking for a pause but life has not made much room for one.',
    'That kind of tired can make every task feel heavier than it should. It is not just a motivation issue.',
    'If your energy is this low, it makes sense that everything feels harder to start.',
  ],
  loneliness: [
    'Feeling alone while trying to keep up with school can hurt in a very quiet way.',
    'That sounds lonely, and it can feel even heavier when everyone around you seems busy or okay.',
    'You deserve connection with this, not just more pressure to handle it privately.',
  ],
  sadness: [
    'That sounds painful to sit with. You do not have to turn it into a lesson or a plan right away.',
    'I am sorry it feels this heavy. Some days need comfort before they need solutions.',
    'That kind of sadness can make the whole day feel slower and harder than people realize.',
  ],
  stuck: [
    'Feeling stuck does not mean you are lazy. It often means your brain is overloaded or tired of starting from panic.',
    'Being behind can make starting feel almost impossible, because every task comes with guilt attached.',
    'That stuck feeling is frustrating. We can lower the pressure enough for one small step to become possible.',
  ],
  okay: [
    'I am glad you are still finding some steadiness. We can use that to protect your energy before things pile up again.',
    'Okay is a real place to be. It does not need to be dramatic for it to matter.',
    'If today is manageable, we can keep it gentle and make sure you do not spend all your energy at once.',
  ],
};

const nextSteps: Record<Emotion, string[]> = {
  academic_pressure: [
    'Want to tell me which task is taking up the most space right now?',
    'We can separate what is urgent from what only feels urgent.',
    'If you want, we can shrink the first task into something you can do in ten minutes.',
  ],
  anxiety: [
    'What is the worry saying might happen?',
    'Try staying with me for one slow breath, then tell me the most concrete part of the fear.',
    'Do you want grounding first, or do you want to unpack the thought?',
  ],
  burnout: [
    'What has been draining you the longest?',
    'Can we look at what can be reduced, delayed, or shared instead of asking you to push harder?',
    'If this has been going on for days or weeks, it may be worth telling someone safe at school or home.',
  ],
  exhaustion: [
    'Have you eaten, had water, or had even ten quiet minutes today?',
    'What is the smallest necessary thing left for today?',
    'Maybe the goal is not to catch up tonight, but to stop the day from taking even more from you.',
  ],
  loneliness: [
    'Is there one person who feels low-pressure enough to message?',
    'What kind of connection would feel safe right now: company, honesty, distraction, or help?',
    'Even a small reach-out counts. You do not need to explain everything perfectly.',
  ],
  sadness: [
    'Do you want to talk about what happened, or should we just stay with the feeling for a moment?',
    'What would feel like care tonight instead of another demand?',
    'If this sadness feels unsafe or unbearable, please reach out to someone nearby or a crisis support line right now.',
  ],
  stuck: [
    'What is one task we can make almost too small to fail?',
    'Can we choose the easiest starting point instead of the most important one?',
    'The first step can be opening the file, writing one sentence, or clearing one small space.',
  ],
  okay: [
    'What would help keep today steady?',
    'Is there anything you want to check in about before it becomes heavy?',
    'What is one small thing you can do now that future-you would appreciate?',
  ],
};

function getUserMessages(state: ChatbotState, userKey = state.activeUserKey): ChatMessage[] {
  return state.messagesByUser[userKey] ?? [starter()];
}

function detectEmotion(content: string): Emotion {
  const normalized = content.toLowerCase();
  const match = Object.entries(emotionKeywords).find(([, keywords]) =>
    keywords.some((keyword) => normalized.includes(keyword))
  );

  return (match?.[0] as Emotion | undefined) ?? 'okay';
}

function pickFresh(options: string[], recentAssistantText: string): string {
  const available = options.filter((option) => !recentAssistantText.includes(option.slice(0, 42)));
  const pool = available.length ? available : options;
  return pool[Math.floor(Math.random() * pool.length)];
}

function mentionRecentContext(recentMessages: ChatMessage[]): string {
  const recentUserMessages = recentMessages.filter((message) => message.role === 'user').slice(-3);
  if (recentUserMessages.length < 2) return '';

  const previous = recentUserMessages[recentUserMessages.length - 2]?.content;
  if (!previous) return '';

  const shortened = previous.length > 72 ? `${previous.slice(0, 69)}...` : previous;
  return `Earlier you mentioned "${shortened}", so I do not want to treat this like a random new problem. `;
}

function buildMajikReply(content: string, recentMessages: ChatMessage[]): string {
  const emotion = detectEmotion(content);
  const recentAssistantText = recentMessages
    .filter((message) => message.role === 'assistant')
    .slice(-5)
    .map((message) => message.content)
    .join(' ');
  const contextLine = mentionRecentContext(recentMessages);
  const opener = pickFresh(responseOpeners[emotion], recentAssistantText);
  const nextStep = pickFresh(nextSteps[emotion], recentAssistantText);

  return `${contextLine}${opener} ${nextStep}`;
}

export const useChatbotStore = create<ChatbotState>()(
  persist(
    (set, get) => ({
      activeUserKey: defaultUserKey,
      messagesByUser: { [defaultUserKey]: [starter()] },
      isTyping: false,
      messages: [starter()],
      setActiveUser: (userKey) =>
        set((state) => {
          const nextMessagesByUser = {
            ...state.messagesByUser,
            [userKey]: state.messagesByUser[userKey] ?? [starter()],
          };
          return {
            activeUserKey: userKey,
            messagesByUser: nextMessagesByUser,
            messages: nextMessagesByUser[userKey],
            isTyping: false,
          };
        }),
      resetForOnlyUser: (userKey) =>
        set(() => {
          const fresh = [starter()];
          return {
            activeUserKey: userKey,
            messagesByUser: { [userKey]: fresh },
            messages: fresh,
            isTyping: false,
          };
        }),
      sendMessage: (content) => {
        const trimmed = content.trim();
        if (!trimmed) return;

        const state = get();
        const userKey = state.activeUserKey;
        const currentMessages = getUserMessages(state, userKey);
        const userMessage: ChatMessage = {
          id: `user-${Date.now()}`,
          role: 'user',
          content: trimmed,
          createdAt: new Date().toISOString(),
        };
        const withUserMessage = [...currentMessages, userMessage];

        set((previous) => ({
          messagesByUser: { ...previous.messagesByUser, [userKey]: withUserMessage },
          messages: withUserMessage,
          isTyping: true,
        }));

        const delay = Math.min(1300, Math.max(650, trimmed.length * 14));

        setTimeout(() => {
          const latest = get();
          if (latest.activeUserKey !== userKey) return;

          const recentMessages = getUserMessages(latest, userKey);
          const botMessage: ChatMessage = {
            id: `majik-${Date.now()}`,
            role: 'assistant',
            content: buildMajikReply(trimmed, recentMessages),
            createdAt: new Date().toISOString(),
          };
          const nextMessages = [...recentMessages, botMessage];

          set((previous) => ({
            messagesByUser: { ...previous.messagesByUser, [userKey]: nextMessages },
            messages: nextMessages,
            isTyping: false,
          }));
        }, delay);
      },
      clear: () =>
        set((state) => {
          const fresh = [starter()];
          return {
            messagesByUser: { ...state.messagesByUser, [state.activeUserKey]: fresh },
            messages: fresh,
            isTyping: false,
          };
        }),
    }),
    {
      name: 'exhausted_majik_chat_marjinel_v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        activeUserKey: state.activeUserKey,
        messagesByUser: state.messagesByUser,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const messages = state.messagesByUser[state.activeUserKey] ?? [starter()];
        state.messages = messages;
        state.isTyping = false;
      },
    }
  )
);
