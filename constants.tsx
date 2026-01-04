
import { Task, User, GratitudePost } from './types';

// Função auxiliar para pegar a data de hoje no formato YYYY-MM-DD local
const today = new Date().toISOString().split('T')[0];

export const INITIAL_TASKS: Task[] = [];

export const TOP_USERS: User[] = [];

export const GRATITUDE_FEED: GratitudePost[] = [];
