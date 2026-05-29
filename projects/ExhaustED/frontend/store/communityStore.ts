import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CommunityComment, CommunityPost } from '@/types';

interface CommunityState {
  posts: CommunityPost[];
  clearPosts: () => void;
  addPost: (input: { content: string; mood?: string }) => CommunityPost;
  addComment: (postId: string, content: string) => void;
}

const blockedWords = [
  'fuck',
  'shit',
  'bitch',
  'asshole',
  'gago',
  'tanga',
  'putangina',
  'puta',
  'ulol',
  'bobo',
];

function validateSupportiveText(text: string) {
  const normalized = text.toLowerCase();
  const blocked = blockedWords.find((word) => normalized.includes(word));
  if (blocked) {
    throw new Error('Please keep the community supportive. Offensive words are not allowed.');
  }
  if (!text.trim()) {
    throw new Error('Please write something before posting.');
  }
}

export const useCommunityStore = create<CommunityState>()(
  persist(
    (set) => ({
      posts: [],
      clearPosts: () => set({ posts: [] }),
      addPost: (input) => {
        validateSupportiveText(input.content);
        const post: CommunityPost = {
          id: `post-${Date.now()}`,
          content: input.content.trim(),
          mood: input.mood,
          createdAt: new Date().toISOString(),
          comments: [],
        };
        set((state) => ({ posts: [post, ...state.posts] }));
        return post;
      },
      addComment: (postId, content) => {
        validateSupportiveText(content);
        const comment: CommunityComment = {
          id: `comment-${Date.now()}`,
          content: content.trim(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
          ),
        }));
      },
    }),
    {
      name: 'exhausted_community_marjinel_v1',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
