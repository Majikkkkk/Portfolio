import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  'http://10.43.1.182:5000/api';

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach auth token to every request
api.interceptors.request.use(
  async (config) => {
    const token = (await AsyncStorage.getItem('exhausted_token')) || (await AsyncStorage.getItem('mbalance_token'));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle global errors (e.g. 401 → redirect to login)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.multiRemove(['exhausted_token', 'exhausted_user', 'mbalance_token', 'mbalance_user']);
      // The auth store listens to storage changes
    }
    return Promise.reject(error);
  }
);

export default api;

// ─── Auth API ──────────────────────────────────────────────────────────────────

export const authApi = {
  register: (data: object) => api.post('/auth/register', data),
  login: (data: object) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  changePassword: (data: object) => api.patch('/auth/password', data),
  deleteAccount: () => api.delete('/auth'),
};

// ─── Assessment API ────────────────────────────────────────────────────────────

export const assessmentApi = {
  create: (data: object) => api.post('/assessment/create', data),
  getHistory: (params?: object) => api.get('/assessment/history', { params }),
  getLatest: () => api.get('/assessment/latest'),
  getById: (id: string) => api.get(`/assessment/${id}`),
};

// ─── Check-in API ──────────────────────────────────────────────────────────────

export const checkinApi = {
  create: (data: object) => api.post('/checkin/create', data),
  getHistory: (params?: object) => api.get('/checkin/history', { params }),
  getToday: () => api.get('/checkin/today'),
};

// ─── Chat API ──────────────────────────────────────────────────────────────────

export const chatApi = {
  sendMessage: (message: string) => api.post('/chat/message', { message }),
  getHistory: () => api.get('/chat/history'),
};

// ─── Journal API ───────────────────────────────────────────────────────────────

export const journalApi = {
  create: (data: object) => api.post('/journal', data),
  getEntries: (params?: object) => api.get('/journal', { params }),
  update: (id: string, data: object) => api.put(`/journal/${id}`, data),
  delete: (id: string) => api.delete(`/journal/${id}`),
};

// ─── Community API ─────────────────────────────────────────────────────────────

export const communityApi = {
  createPost: (data: object) => api.post('/community', data),
  getPosts: () => api.get('/community'),
  addComment: (id: string, data: object) => api.post(`/community/${id}/comments`, data),
};

// ─── Analytics API ─────────────────────────────────────────────────────────────

export const analyticsApi = {
  getWeekly: () => api.get('/analytics/weekly'),
  getInsights: () => api.get('/analytics/insights'),
};

// ─── User API ──────────────────────────────────────────────────────────────────

export const userApi = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data: object) => api.put('/user/profile', data),
  updateNotifications: (data: object) => api.put('/user/notifications', data),
  updatePrivacy: (data: object) => api.put('/user/privacy', data),
  updateWellness: (data: object) => api.put('/user/wellness', data),
};
