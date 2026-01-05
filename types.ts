/// <reference types="vite/client" />

export enum View {
  LOGIN = 'login',
  REGISTER = 'register',
  CONFIRM_EMAIL = 'confirm-email',
  FORGOT_PASSWORD = 'forgot-password',
  WELCOME = 'welcome',
  ONBOARDING_NAME = 'onboarding-name',
  COMMITMENT = 'commitment',
  DASHBOARD = 'dashboard',
  RANKING = 'ranking',
  JOURNEY = 'journey',
  ACHIEVEMENTS = 'achievements',
  GRATITUDE = 'gratitude',
  ADD_GRATITUDE = 'add-gratitude',
  CALENDAR = 'calendar',
  MESSAGES = 'messages',
  USER_PROFILE = 'user-profile',
  ADMIN_DASHBOARD = 'admin-dashboard',
  ADMIN_NOTIFICATIONS = 'admin-notifications',
  ADMIN_USERS = 'admin-users',
  ADMIN_WISDOM = 'admin-wisdom',
  ADMIN_FORGE = 'admin-forge',
  ADMIN_CALENDAR = 'admin-calendar'
}

export interface Task {
  id: string;
  title: string;
  category: 'Corpo' | 'Alma' | 'Espírito';
  xp: number;
  completed: boolean;
  icon: string;
  scheduledDate: string;
  imageUrl?: string;
  userId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  level: number;
  xp: number;
  avatar: string;
  status: 'Ativo' | 'Inativo' | 'Banido';
  role: 'User' | 'Admin';
  focus?: string;
  bio?: string;
  city?: string;
  state?: string;
  connections?: string[];
  pendingRequests?: string[]; // IDs de usuários que solicitaram conexão para este usuário
  sentRequests?: string[];    // IDs de usuários para quem este usuário enviou solicitação
  hasAcceptedCommitment?: boolean;
  isVerified?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface AppEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  link?: string;
  imageUrl?: string;
  type: 'LIVE' | 'EVENTO' | 'MENTORIA';
  xpReward: number;
}

export interface GratitudeComment {
  id: string;
  author: string;
  text: string;
  time: string;
}

export interface GratitudePost {
  id: string;
  authorId?: string;
  author: string;
  content: string;
  likes: number;
  icon: string;
  imageUrl?: string;
  type: 'LUZ' | 'AMÉM';
  comments?: GratitudeComment[];
}

export interface AppNotification {
  id: string;
  message: string;
  time: string;
  timestamp: number;
  read: boolean;
  icon: string;
  type: 'LIKE' | 'SYSTEM' | 'LEVEL' | 'COMMENT' | 'MESSAGE' | 'CONNECTION_REQUEST';
  fromUserId?: string;
}
