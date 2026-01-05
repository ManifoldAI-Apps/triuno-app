
import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { View, Task, GratitudePost, User, AppNotification, AppEvent, ChatMessage } from './types';
import { INITIAL_TASKS, GRATITUDE_FEED } from './constants';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import ConfirmEmail from './components/ConfirmEmail';
import ForgotPassword from './components/ForgotPassword';
import Commitment from './components/Commitment';
import Dashboard from './components/Dashboard';
import Ranking from './components/Ranking';
import Journey from './components/Journey';
import Achievements from './components/Achievements';
import Gratitude from './components/Gratitude';
import AddGratitude from './components/AddGratitude';
import CalendarView from './components/CalendarView';
import UserProfile from './components/UserProfile';
import DirectMessages from './components/DirectMessages';
import AdminDashboard from './components/AdminDashboard';
import AdminUsers from './components/AdminUsers';
import AdminWisdom from './components/AdminWisdom';
import AdminForge from './components/AdminForge';
import AdminCalendar from './components/AdminCalendar';
import Navbar from './components/Navbar';
// Fix: Added Gemini API import for AI support interaction
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.WELCOME);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  const getInitialUser = (): User => ({
    id: 'u-main',
    name: 'Buscador Solitário',
    email: '',
    level: 1,
    xp: 0,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB74Y8ceZgGcCwCi8BYI81Q8BeMUPMo5zFjWEzWO3KFqMv8hy1md0VNoDEsiVaLDdanFbGDLv_k6GjQdGiGGIfMT02LGBId6qOIxQ4RtcHcB0E6xynPoHVkJj2IM77-MJKf6mE4xM74apHAs4WcONmunxVdbe40T82qlnTw3ZIJbfaS0VOjY6QsWzRRH3kvFRhHW_fTPIQdtRH1C04fBAj-LNcFsk2yNHmGSIQoBJ6GtAmP9P8sNutwBOG-4eCPcKGVn0yYV2_pMysH',
    status: 'Ativo',
    role: 'User',
    connections: [],
    pendingRequests: [],
    sentRequests: [],
    hasAcceptedCommitment: false,
    isVerified: false
  });

  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('triuno_user');
    return saved ? JSON.parse(saved) : getInitialUser();
  });

  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);



  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [gratitudePosts, setGratitudePosts] = useState<GratitudePost[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>(() => {
    const saved = localStorage.getItem('triuno_liked_posts');
    return saved ? JSON.parse(saved) : [];
  });
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [wisdom, setWisdom] = useState<string>(() => {
    return localStorage.getItem('triuno_wisdom') || "O equilíbrio é a chave para a ascensão plena.";
  });
  const [events, setEvents] = useState<AppEvent[]>([]);
  const [attendedEvents, setAttendedEvents] = useState<string[]>(() => {
    const saved = localStorage.getItem('triuno_attended_events');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => { localStorage.setItem('triuno_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('triuno_db_users', JSON.stringify(registeredUsers)); }, [registeredUsers]);
  useEffect(() => { localStorage.setItem('triuno_messages', JSON.stringify(messages)); }, [messages]);
  useEffect(() => {
    localStorage.setItem('triuno_tasks', JSON.stringify(tasks));
    localStorage.setItem('triuno_gratitude', JSON.stringify(gratitudePosts));
    localStorage.setItem('triuno_liked_posts', JSON.stringify(likedPosts));
    localStorage.setItem('triuno_notifications', JSON.stringify(notifications));
    localStorage.setItem('triuno_wisdom', wisdom);
    localStorage.setItem('triuno_events', JSON.stringify(events));
    localStorage.setItem('triuno_attended_events', JSON.stringify(attendedEvents));
  }, [tasks, gratitudePosts, likedPosts, notifications, wisdom, events, attendedEvents]);

  useEffect(() => {
    const savedAuth = localStorage.getItem('triuno_auth');
    if (savedAuth === 'true' && user.email) {
      setIsAuthenticated(true);
      setCurrentView(user.role === 'Admin' ? View.ADMIN_DASHBOARD : View.DASHBOARD);
    } else {
      setCurrentView(View.WELCOME);
    }
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
    return () => clearTimeout(timer);
  }, []);

  // Cleanup Legacy Mock Data (One-time run)
  useEffect(() => {
    const CLEANUP_VERSION = 'v1.2';
    const currentVersion = localStorage.getItem('triuno_cleanup_version');

    if (currentVersion !== CLEANUP_VERSION) {
      console.log('Cleaning up legacy mock data v1.2...');
      localStorage.removeItem('triuno_gratitude');
      localStorage.removeItem('triuno_tasks');
      localStorage.removeItem('triuno_notifications');

      localStorage.setItem('triuno_cleanup_version', CLEANUP_VERSION);
      // Force reload state
      setGratitudePosts([]);
      setNotifications([]);
    }
  }, []);

  // Supabase Synchronization
  useEffect(() => {
    const syncData = async () => {
      // 1. Sync Users
      const { data: dbUsers } = await supabase.from('users').select('*');
      if (dbUsers) {
        setRegisteredUsers(dbUsers as User[]);
      }

      // 2. Sync Gratitude (Feed is shared)
      const { data: dbPosts } = await supabase.from('gratitudePosts').select('*').order('createdAt', { ascending: false });
      if (dbPosts) {
        setGratitudePosts(dbPosts as GratitudePost[]);
      }

      // 3. Sync Tasks (Personal)
      const { data: dbTasks } = await supabase.from('tasks').select('*');
      if (dbTasks) {
        setTasks(dbTasks as Task[]);
      }

      // 4. Sync Events
      const { data: dbEvents } = await supabase.from('events').select('*');
      if (dbEvents) {
        setEvents(dbEvents as AppEvent[]);
      }

      // 5. Sync Messages
      const { data: dbMessages } = await supabase.from('messages').select('*');
      if (dbMessages) {
        setMessages(dbMessages as ChatMessage[]);
      }
    };

    if (import.meta.env.VITE_SUPABASE_URL) {
      syncData();
    }
  }, []); // Run on mount

  // Subscribe to realtime updates for Feed (Optional but nice)
  useEffect(() => {
    if (!import.meta.env.VITE_SUPABASE_URL) return;
    const subscription = supabase
      .channel('public:gratitudePosts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'gratitudePosts' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setGratitudePosts(prev => [payload.new as GratitudePost, ...prev]);
        }
      })
      .subscribe();
    return () => { supabase.removeChannel(subscription); };
  }, []);

  const handleLogin = (email: string, pass: string) => {
    const found = registeredUsers.find(u => u.email === email && u.password === pass);
    if (found) {
      setUser(found);
      setIsAuthenticated(true);
      localStorage.setItem('triuno_auth', 'true');

      // Check if user has accepted commitment
      if (found.role !== 'Admin' && !found.hasAcceptedCommitment) {
        setCurrentView(View.COMMITMENT);
      } else {
        setCurrentView(found.role === 'Admin' ? View.ADMIN_DASHBOARD : View.DASHBOARD);
      }
      return true;
    }
    return false;
  };

  const handleRegister = async (name: string, email: string, pass: string) => {
    if (registeredUsers.some(u => u.email === email)) {
      return false; // Email exists
    }

    const newUser: User = {
      id: `u-${Date.now()}`,
      name,
      email,
      password: pass,
      level: 1,
      xp: 0,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB74Y8ceZgGcCwCi8BYI81Q8BeMUPMo5zFjWEzWO3KFqMv8hy1md0VNoDEsiVaLDdanFbGDLv_k6GjQdGiGGIfMT02LGBId6qOIxQ4RtcHcB0E6xynPoHVkJj2IM77-MJKf6mE4xM74apHAs4WcONmunxVdbe40T82qlnTw3ZIJbfaS0VOjY6QsWzRRH3kvFRhHW_fTPIQdtRH1C04fBAj-LNcFsk2yNHmGSIQoBJ6GtAmP9P8sNutwBOG-4eCPcKGVn0yYV2_pMysH',
      status: 'Ativo',
      role: 'User',
      bio: 'Buscador da Ascensão.',
      connections: [],
      pendingRequests: [],
      sentRequests: [],
      hasAcceptedCommitment: false,
      isVerified: false
    };

    // Save to Supabase first
    const { error } = await supabase.from('users').insert(newUser);

    if (error) {
      console.error('Error registering user:', error);
      // Fallback? Ideally show error to user but simple flow for now:
      // Proceed with local update to not block user, but log error.
    }

    setRegisteredUsers(prev => [...prev, newUser]);
    // Redirect to Login instead of auto-login
    // setUser(newUser);
    // setIsAuthenticated(true);
    // localStorage.setItem('triuno_auth', 'true');
    setCurrentView(View.LOGIN);
    return true;
  };

  const handleCommitmentAccepted = async () => {
    const updated = { ...user, hasAcceptedCommitment: true };
    setUser(updated);
    setRegisteredUsers(prev => prev.map(u => u.id === user.id ? updated : u));

    // Save to Supabase
    await supabase.from('users').upsert(updated);

    setCurrentView(View.DASHBOARD);
  };

  const handleUpdateUser = async (updatedData: Partial<User>) => {
    let updated = { ...user, ...updatedData };

    // Level Up Logic
    if (updatedData.xp !== undefined) {
      let newLevel = updated.level;
      let newXp = updated.xp;

      while (newXp >= 100) {
        newXp -= 100;
        newLevel += 1;

        // Notify Level Up
        const notif: AppNotification = {
          id: `lvl-${Date.now()}-${newLevel}`,
          message: `Ascensão alcançada! Bem-vindo ao nível ${newLevel}.`,
          time: 'Agora',
          timestamp: Date.now(),
          read: false,
          icon: 'stars',
          type: 'LEVEL'
        };
        setNotifications(prev => [notif, ...prev]);
      }

      updated.level = newLevel;
      updated.xp = newXp;
    }

    setUser(updated);
    setRegisteredUsers(prev => prev.map(u => u.id === user.id ? updated : u));

    // Save to Supabase
    if (user.id) {
      await supabase.from('users').upsert(updated);
    }
  };

  // Fix: Added missing handleOpenSupport function to navigate to admin chat
  const handleOpenSupport = () => {
    setSelectedProfileId('u-admin');
    setCurrentView(View.MESSAGES);
  };

  const handleRequestConnection = (targetId: string) => {
    if (user.sentRequests?.includes(targetId)) return;

    // Atualiza usuário local (enviou)
    const updatedUser = {
      ...user,
      sentRequests: [...(user.sentRequests || []), targetId]
    };
    setUser(updatedUser);

    // Atualiza base de dados (o outro recebeu)
    setRegisteredUsers(prev => prev.map(u => {
      if (u.id === targetId) {
        return { ...u, pendingRequests: [...(u.pendingRequests || []), user.id] };
      }
      if (u.id === user.id) return updatedUser;
      return u;
    }));

    // Criar notificação para o alvo (simulado)
    const newNotif: AppNotification = {
      id: `conn-req-${Date.now()}`,
      message: `${user.name} deseja sincronizar almas com você.`,
      time: 'Agora',
      timestamp: Date.now(),
      read: false,
      icon: 'sync',
      type: 'CONNECTION_REQUEST',
      fromUserId: user.id
    };
    // Em um app real, isso iria para o DB do outro usuário. 
    setNotifications(prev => [newNotif, ...prev]);

    // Save Request to DB (Update both users ideally, or use a proper FriendRequest table. 
    // Sticking to User table arrays as per schema)
    const syncRequest = async () => {
      await supabase.from('users').upsert({ ...updatedUser });
      // We also need to update the target user in DB. 
      // Since we don't have the full target user object easily accessible without fetching, 
      // we might loose data if we just push a partial update? 
      // Supabase `update` works with partials!
      // We need to fetch current target to get their pendingRequests array? 
      // Postgres has array_append but we are sending JSONB. 
      // For now, we will assume we read the 'registeredUsers' which is synced on load.
      const target = registeredUsers.find(u => u.id === targetId);
      if (target) {
        const updatedTarget = { ...target, pendingRequests: [...(target.pendingRequests || []), user.id] };
        await supabase.from('users').upsert(updatedTarget);
      }
    };
    syncRequest();
  };

  const handleAcceptConnection = async (requesterId: string) => {
    const requester = registeredUsers.find(u => u.id === requesterId);
    if (!requester) return;

    // Atualiza usuário local
    const updatedUser = {
      ...user,
      pendingRequests: (user.pendingRequests || []).filter(id => id !== requesterId),
      connections: [...(user.connections || []), requesterId]
    };
    setUser(updatedUser);

    // Save to DB
    await supabase.from('users').upsert(updatedUser);

    // Atualiza requester e base
    const updateRequester = async () => {
      const requesterData = registeredUsers.find(u => u.id === requesterId);
      if (requesterData) {
        const updatedRequester = {
          ...requesterData,
          sentRequests: (requesterData.sentRequests || []).filter(id => id !== user.id),
          connections: [...(requesterData.connections || []), user.id]
        };
        setRegisteredUsers(prev => prev.map(u => u.id === requesterId ? updatedRequester : u));
        await supabase.from('users').upsert(updatedRequester);
      }
    };
    updateRequester();
  };

  // Fix: Updated sendMessage with Gemini AI for admin (Support) interactions
  const sendMessage = async (receiverId: string, text: string) => {
    const newMessage: ChatMessage = {
      id: `m-${Date.now()}`,
      senderId: user.id,
      receiverId,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    setMessages(prev => [...prev, newMessage]);

    supabase.from('messages').insert(newMessage);

    if (receiverId === 'u-admin') {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: text,
          config: {
            systemInstruction: "Você é o 'Guardião Mor' do Triuno, um portal de ascensão pessoal focado em Corpo, Alma e Espírito. Sua missão é guiar os Buscadores com sabedoria, empatia e inspiração. Fale de forma mística porém prática. Use termos como 'Ascensão', 'Éter', 'Senda'. Suas respostas devem ser curtas e encorajadoras.",
          },
        });

        const replyText = response.text || "O éter está silencioso no momento, buscador. Mantenha sua luz.";

        const adminReply: ChatMessage = {
          id: `m-admin-${Date.now()}`,
          senderId: receiverId,
          receiverId: user.id,
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false
        };
        setMessages(prev => [...prev, adminReply]);

        const newNotif: AppNotification = {
          id: `notif-msg-${Date.now()}`,
          message: `Novo eco do Guardião Mor`,
          time: 'Agora',
          timestamp: Date.now(),
          read: false,
          icon: 'auto_awesome',
          type: 'MESSAGE'
        };
        setNotifications(prev => [newNotif, ...prev]);
      } catch (err) {
        console.error("Erro no portal de mensagens:", err);
      }
    } else {
      const targetUser = registeredUsers.find(u => u.id === receiverId);
      if (targetUser) {
        setTimeout(() => {
          const replyText = `Eco recebido por ${targetUser.name}.`;
          const reply: ChatMessage = {
            id: `m-reply-${Date.now()}`,
            senderId: receiverId,
            receiverId: user.id,
            text: replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: false
          };
          setMessages(prev => [...prev, reply]);
        }, 1500);
      }
    }
  };

  const handleToggleTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const updated = { ...task, completed: !task.completed };
      setTasks(prev => prev.map(t => t.id === taskId ? updated : t));
      await supabase.from('tasks').upsert(updated);
    }
  };

  const renderView = () => {
    if (user.role === 'Admin' && isAuthenticated) {
      switch (currentView) {
        case View.ADMIN_DASHBOARD: return <AdminDashboard setView={setCurrentView} totalGratitude={gratitudePosts.length} onLogout={() => setIsLogoutModalOpen(true)} />;
        case View.ADMIN_USERS: return <AdminUsers onBack={() => setCurrentView(View.ADMIN_DASHBOARD)} registeredUsers={registeredUsers} />;
        case View.ADMIN_WISDOM: return <AdminWisdom onBack={() => setCurrentView(View.ADMIN_DASHBOARD)} onSave={(w) => { setWisdom(w); setCurrentView(View.ADMIN_DASHBOARD); }} />;
        case View.ADMIN_FORGE: return <AdminForge onBack={() => setCurrentView(View.ADMIN_DASHBOARD)} tasks={tasks} onUpdateTasks={setTasks} />;
        case View.ADMIN_CALENDAR: return <AdminCalendar onBack={() => setCurrentView(View.ADMIN_DASHBOARD)} onAdd={(ev) => { setEvents(prev => [...prev, ev]); setCurrentView(View.ADMIN_DASHBOARD); }} />;
        default: return <AdminDashboard setView={setCurrentView} totalGratitude={gratitudePosts.length} onLogout={() => setIsLogoutModalOpen(true)} />;
      }
    }

    switch (currentView) {
      case View.WELCOME: return <Welcome onNext={() => setCurrentView(View.LOGIN)} onAdminLogin={() => { }} />;
      case View.LOGIN: return <Login onLogin={handleLogin} onGoToRegister={() => setCurrentView(View.REGISTER)} onGoToForgotPassword={() => setCurrentView(View.FORGOT_PASSWORD)} />;
      case View.REGISTER: return <Register onRegister={handleRegister} onGoToLogin={() => setCurrentView(View.LOGIN)} />;
      case View.COMMITMENT: return <Commitment user={user} onNext={handleCommitmentAccepted} />;
      case View.DASHBOARD: return <Dashboard setView={setCurrentView} tasks={tasks} toggleTask={handleToggleTask} user={user} wisdom={wisdom} notifications={notifications} markRead={() => setNotifications(n => n.map(x => ({ ...x, read: true })))} onLogout={() => setIsLogoutModalOpen(true)} onSupport={handleOpenSupport} onAcceptConnection={handleAcceptConnection} />;
      case View.RANKING: return <Ranking setView={setCurrentView} userXP={user.xp} onUserClick={(id) => { setSelectedProfileId(id); setCurrentView(View.USER_PROFILE); }} registeredUsers={registeredUsers} />;
      case View.JOURNEY: return <Journey setView={setCurrentView} user={user} tasks={tasks} onLogout={() => setIsLogoutModalOpen(true)} onUpdateUser={handleUpdateUser} onSupport={handleOpenSupport} />;
      case View.ACHIEVEMENTS: return <Achievements user={user} setView={setCurrentView} />;
      case View.GRATITUDE: return <Gratitude setView={setCurrentView} posts={gratitudePosts} onLike={(id) => setLikedPosts(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])} onComment={(postId, text) => {
        const comment = { id: Date.now().toString(), author: user.name, text, time: 'Agora' };
        setGratitudePosts(prev => prev.map(p => p.id === postId ? { ...p, comments: [...(p.comments || []), comment] } : p));
      }} likedPosts={likedPosts} onUserClick={(id) => { setSelectedProfileId(id); setCurrentView(View.USER_PROFILE); }} />;
      case View.ADD_GRATITUDE: return <AddGratitude onBack={() => setCurrentView(View.GRATITUDE)} onAdd={handleAddGratitude} />;
      case View.CALENDAR: return <CalendarView setView={setCurrentView} events={events} onAttend={handleAttendEvent} attendedEvents={attendedEvents} />;
      case View.USER_PROFILE:
        const profile = registeredUsers.find(u => u.id === selectedProfileId);
        return <UserProfile user={user} profile={profile!} onBack={() => setCurrentView(View.RANKING)} onRequestConnection={handleRequestConnection} onMessage={(id) => { setSelectedProfileId(id); setCurrentView(View.MESSAGES); }} />;
      case View.MESSAGES:
        return <DirectMessages user={user} initialContactId={selectedProfileId} registeredUsers={registeredUsers} messages={messages} onSendMessage={sendMessage} onBack={() => setCurrentView(View.DASHBOARD)} />;
      default: return <Dashboard setView={setCurrentView} tasks={tasks} toggleTask={() => { }} user={user} wisdom={wisdom} notifications={notifications} markRead={() => { }} onLogout={() => { }} onSupport={handleOpenSupport} onAcceptConnection={handleAcceptConnection} />;
    }
  };

  const handleAddGratitude = async (content: string, anonymous: boolean) => {
    const newPost: GratitudePost = {
      id: `g-${Date.now()}`,
      author: anonymous ? 'Anônimo' : user.name,
      authorId: anonymous ? undefined : user.id,
      content,
      likes: 0,
      icon: 'auto_awesome',
      type: 'LUZ',
      comments: []
    };
    setGratitudePosts(prev => [newPost, ...prev]);
    setCurrentView(View.GRATITUDE);
    setCurrentView(View.GRATITUDE);
    handleUpdateUser({ xp: user.xp + 5 });

    // Save to DB
    await supabase.from('gratitudePosts').insert(newPost);
  };

  const handleAttendEvent = (eventId: string) => {
    if (!attendedEvents.includes(eventId)) {
      const event = events.find(e => e.id === eventId);
      if (event) {
        setAttendedEvents(prev => [...prev, eventId]);
        handleUpdateUser({ xp: Math.min(100, user.xp + event.xpReward) });

        supabase.from('attendedEvents').insert({ userId: user.id, eventId: eventId });
      }
    }
  };

  const mainViews = [View.DASHBOARD, View.CALENDAR, View.RANKING, View.ACHIEVEMENTS, View.GRATITUDE, View.JOURNEY, View.MESSAGES];
  const showNavbar = isAuthenticated && user.role !== 'Admin' && mainViews.includes(currentView);

  return (
    <div className="min-h-screen bg-deep-void text-text-primary font-sans antialiased overflow-x-hidden">
      <div className="max-w-screen-2xl mx-auto relative h-full min-h-screen">
        {renderView()}
        {showNavbar && <Navbar activeView={currentView} setView={setCurrentView} />}
        {isLogoutModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center px-6">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setIsLogoutModalOpen(false)}></div>
            <div className="relative glass-panel !bg-slate-900/95 border-aurora-orange/40 w-full max-w-sm p-8 rounded-[40px] shadow-2xl flex flex-col items-center text-center animate-slide-up border-2">
              <span className="material-symbols-outlined text-aurora-orange text-5xl mb-4">logout</span>
              <h3 className="text-xl font-black uppercase text-white mb-2">Interromper Jornada?</h3>
              <button onClick={() => { setIsAuthenticated(false); localStorage.removeItem('triuno_auth'); setCurrentView(View.WELCOME); setIsLogoutModalOpen(false); }} className="w-full py-4 rounded-2xl bg-aurora-orange text-white font-black uppercase tracking-widest mt-4 shadow-glow-orange">Sim, Sair</button>
              <button onClick={() => setIsLogoutModalOpen(false)} className="w-full py-4 rounded-2xl bg-white/5 text-text-secondary font-black uppercase tracking-widest mt-2">Permanecer</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
