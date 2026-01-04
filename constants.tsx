
import { Task, User, GratitudePost } from './types';

// Função auxiliar para pegar a data de hoje no formato YYYY-MM-DD local
const today = new Date().toISOString().split('T')[0];

export const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Beber 2L de água', category: 'Corpo', xp: 10, completed: false, icon: 'water_drop', scheduledDate: today },
  { id: '2', title: 'Meditação Matinal', category: 'Espírito', xp: 50, completed: false, icon: 'self_improvement', scheduledDate: today },
  { id: '3', title: 'Ler 10 Páginas', category: 'Alma', xp: 30, completed: false, icon: 'menu_book', scheduledDate: today },
  { id: '4', title: 'Dormir 8h', category: 'Corpo', xp: 20, completed: true, icon: 'bed', scheduledDate: today }
];

export const TOP_USERS: User[] = [
  { id: 'u1', name: 'Gabriel S.', email: 'gabriel@triuno.com', level: 25, xp: 2450, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR0Ln7dWPmTZ8szoPx1Pb5GxPS_ibc7d5qjzPuAskgfR7Y4I2XmrQnRnLoAA4Ja9doyhZxZlO8zMIOj9U5qjZ2bVwd9cC52CcbE28vXUmzSjoMtsXctu2KmiKuB64OXBWIFTOABOdbrhgGLf5vSxPeFhgfNamqB_SOuAMh4ciBMIkQlAae5_Ltuz7W0NReAPToGIIBbgFg4X2trAZsw1EPuovIAZpguOPPqTmzjUHWhU7yvA0FWc4rTurAZd7g21NOmyq1C4XyX5be', status: 'Ativo', role: 'User' },
  { id: 'u2', name: 'Sarah M.', email: 'sarah@triuno.com', level: 22, xp: 2250, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyfHoqH6sXnRbR6JaMcwg5Aa4Kxh80uhAIycrfR1BG7oFAIpVL3qUMVxhIpJYrgtu03m5QqZuYuIpUcmwRDQh6MoBXjRyVsETDIa9orblpk97x-mBfeBh1tqGChNXzV75ZGTj9OuMWOx0K2jEQjvlxJERp_NbmEZmD9Rte3XjIl2HdLn6znR7zTwDG2OmnIPlVTiIGpj8EoHMcAS7CgEmIF2OGrvUK51UWCEY816WzVSQLRI3-NLv45UR2xjFZc8gu4kYQkeQZKYn2', status: 'Ativo', role: 'User' },
  { id: 'u3', name: 'Lucas P.', email: 'lucas@triuno.com', level: 21, xp: 2100, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBX9-rge8smVo9tWDqiGx_y5KAxFm4gMBz6GFBq_l684SPw1H5wGiv7GnIa4zM_mgJ0taey1xkZbHxeUK40vBI969DY7JEphDMF_llMPfqCszS7VOlohC_ULEJFtSnrDtnQEPwIAkgxovlDJ-jZA3nHcmtOmwBxtTNqcVwWp0PnfjAs083cPHNqYQVpBeaAZJNLcFL94NGQAqA6gSMlVL5Tl5brN-Ji1FZA_skeaBih86Rh8s8SGGoXxUlx-5ckdTm0g1kawXtoTd4g', status: 'Ativo', role: 'User' }
];

// Fix: Added authorId to mock posts to support profile navigation features
export const GRATITUDE_FEED: GratitudePost[] = [
  { id: 'g1', authorId: 'u1', author: 'Maria S.', content: 'Gratidão pelo sol que entrou na janela hoje e iluminou meu dia. Senti uma paz imensa.', likes: 12, icon: 'wb_sunny', type: 'LUZ', comments: [] },
  { id: 'g2', authorId: 'u2', author: 'Um Buscador', content: 'Pela saúde da minha família e a paz no meu lar.', likes: 45, icon: 'favorite', type: 'AMÉM', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfep3jARErBUCEdnYQD1PjOymVPZVsDHFf162CjhBpIiIan1YYNIS6wHE2eaMVchiFBno74gAxDpAYjwgvNfUjxvsXyo3esxWHD9tWIeSqc7ogeZ2jWKjTWX3TPFYCMBke_J8QkQqYR3A8octh1Z3TMIXy4jrNPyI9LlrfC0m3SYrBsAWA0WA4RPPl0JROnO885FQcgR65eduMCC483u4NLxSAusMReNXmgKXLjSLshCaAim5w2SYRY2UR3LssZF8aU6O44fDgwR2D', comments: [] },
  { id: 'g3', authorId: 'u3', author: 'João P.', content: '"Consegui perdoar quem me feriu e seguir em frente."', likes: 8, icon: 'bolt', type: 'LUZ', comments: [] },
  { id: 'g4', authorId: 'u1', author: 'Ana C.', content: 'A natureza cura. Passeio renovador hoje pela manhã.', likes: 33, icon: 'spa', type: 'AMÉM', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRZQZSJyxZVp4Qj9GznD4XS2Yf8tM0RPrHYZ-xHsERYv31d_NlEcOET-7LXvRHah5jvwRGdbhjwpQYowvvS1clIincle952XGgLWvq_Lg1GZA87d7mgILJ1StETKovVuA9y4cMrnWJmhqWezt2X6RqlkU929wCLDWD-w0quXCeiI24XKGEurAwqBfKwtuaXFpW6ALoy0Y-UoaWBxyWuSNk8GdqMzGRSxBrF3KTFmTAIY0r83nB_h7Ere53gjn4Xo1sh9AEUVfhDAwk', comments: [] }
];
