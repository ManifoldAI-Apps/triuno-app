
import React, { useState } from 'react';
import { View, Task, User, AppNotification } from '../types';

interface DashboardProps {
  setView: (view: View) => void;
  tasks: Task[];
  toggleTask: (id: string) => void;
  user: User;
  wisdom: string;
  notifications: AppNotification[];
  markRead: () => void;
  onLogout: () => void;
  onSupport: () => void;
  onAcceptConnection: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView, tasks, toggleTask, user, wisdom, notifications, markRead, onLogout, onSupport, onAcceptConnection }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;
  const todayDate = new Date().toISOString().split('T')[0];
  const dailyTasks = tasks.filter(t => t.scheduledDate === todayDate);

  // Calcula porcentagens reais baseadas nas tarefas do dia
  const getProgress = (category: 'Corpo' | 'Alma' | 'Espírito') => {
    const catTasks = dailyTasks.filter(t => t.category === category);
    if (catTasks.length === 0) return 0;
    const completed = catTasks.filter(t => t.completed).length;
    return Math.round((completed / catTasks.length) * 100);
  };

  const vectors = [
    { label: 'Corpo', val: getProgress('Corpo'), color: 'text-emerald-400', icon: 'water_drop' },
    { label: 'Alma', val: getProgress('Alma'), color: 'text-aurora-orange', icon: 'menu_book' },
    { label: 'Espírito', val: getProgress('Espírito'), color: 'text-aurora-blue', icon: 'self_improvement' }
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pt-safe pb-48">
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900 to-deep-void pointer-events-none z-0"></div>
      
      <header className="sticky top-0 z-50 glass-panel !bg-deep-void/60 backdrop-blur-xl flex items-center justify-between p-6 md:px-12 pt-8 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="relative size-10 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-lg cursor-pointer transition-all active:scale-90" onClick={() => setView(View.JOURNEY)}>
            <img alt="Portrait" className="h-full w-full object-cover" src={user.avatar} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xs font-black leading-tight tracking-[0.2em] text-text-primary uppercase truncate max-w-[120px]">
              {user.name || 'Viajante'}
            </h1>
            <p className="text-aurora-blue text-[8px] font-black uppercase tracking-[0.1em] opacity-60">Nível {user.level}</p>
          </div>
        </div>

        <h2 className="hidden md:block text-[10px] font-black tracking-[0.4em] uppercase opacity-40">Ascensão Diária</h2>
        
        <div className="flex items-center gap-2">
          <button onClick={onSupport} className="flex size-10 items-center justify-center rounded-2xl glass-panel text-aurora-gold border-aurora-gold/20 active:scale-90 transition-all">
             <span className="material-symbols-outlined text-[20px]">help</span>
          </button>
          <button onClick={() => setView(View.MESSAGES)} className="relative flex size-10 items-center justify-center rounded-2xl glass-panel text-white border-white/10 active:scale-90 transition-all">
             <span className="material-symbols-outlined text-[20px]">forum</span>
          </button>
          <button onClick={() => {setShowNotifications(true); markRead();}} className="relative flex size-10 items-center justify-center rounded-2xl glass-panel text-text-primary border-white/10 active:scale-90 transition-all">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 size-4 rounded-full bg-aurora-orange flex items-center justify-center text-[8px] font-black text-white border-2 border-deep-void">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 py-6">
        <div className="mb-8 glass-panel p-6 rounded-[28px] border-aurora-blue/20 bg-gradient-to-br from-aurora-blue/5 to-transparent shadow-xl">
          <p className="text-aurora-blue text-[9px] font-black uppercase tracking-[0.2em] mb-3">Sabedoria do Dia</p>
          <p className="text-text-primary italic font-serif text-lg leading-relaxed">"{wisdom}"</p>
        </div>

        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-black text-text-secondary tracking-[0.2em] uppercase">Vetor Triuno</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {vectors.map((p) => (
              <div key={p.label} className="flex flex-col items-center gap-4 glass-panel p-6 shadow-xl rounded-[32px] border-white/5 transition-transform hover:scale-[1.02]">
                <div className="relative size-20">
                  <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3"></circle>
                    <circle 
                      cx="18" 
                      cy="18" 
                      r="16" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      strokeDasharray={`${p.val}, 100`} 
                      strokeLinecap="round" 
                      className={`${p.color} transition-all duration-1000 ease-out`}
                    ></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-[11px] font-black ${p.color} mb-0.5`}>{p.val}%</span>
                    <span className={`material-symbols-outlined text-xl ${p.color} drop-shadow-[0_0_8px_currentColor]`}>{p.icon}</span>
                  </div>
                </div>
                <p className={`${p.color} font-black text-[9px] uppercase tracking-widest`}>{p.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-black text-text-secondary tracking-[0.2em] uppercase">Missões de Hoje</h2>
          </div>
          <div className="space-y-4">
            {dailyTasks.length === 0 ? (
              <p className="text-center text-text-secondary text-xs opacity-50 py-10 uppercase tracking-widest font-black">Todas as missões seladas.</p>
            ) : dailyTasks.map(task => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-[#1E293B]/60 backdrop-blur-md rounded-[26px] border border-white/5 shadow-lg group">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="size-14 rounded-2xl bg-slate-800/40 flex items-center justify-center text-white border border-white/10 group-hover:border-white/20 transition-all shrink-0">
                    <span className="material-symbols-outlined text-2xl">{task.icon}</span>
                  </div>
                  <div className="flex flex-col min-w-0 justify-center">
                    <p className="text-text-primary font-black text-[14px] tracking-widest uppercase truncate leading-tight">{task.title}</p>
                    <p className="text-[10px] text-aurora-gold font-black uppercase tracking-widest mt-0.5">+{task.xp} XP</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleTask(task.id)} 
                  className={`size-12 rounded-full border-2 transition-all active:scale-90 flex items-center justify-center shrink-0 ml-4 ${
                    task.completed 
                    ? 'bg-aurora-emerald border-aurora-emerald text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                    : 'border-white/20 text-transparent bg-white/5'
                  }`}
                >
                   {task.completed ? (
                     <span className="material-symbols-outlined text-[22px] font-black">done_all</span>
                   ) : (
                     <div className="size-full rounded-full border border-white/5"></div>
                   )}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {showNotifications && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setShowNotifications(false)}></div>
          <div className="relative w-full max-w-sm h-full glass-panel !bg-slate-900 border-l border-white/10 shadow-2xl p-6 animate-slide-right">
             <header className="flex items-center justify-between mb-8">
                <h2 className="text-sm font-black uppercase tracking-widest">Ecos do Rio</h2>
                <button onClick={() => setShowNotifications(false)} className="size-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
             </header>
             <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-120px)] no-scrollbar">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center py-20 opacity-30">
                    <span className="material-symbols-outlined text-4xl mb-4">notifications_off</span>
                    <p className="text-xs font-black uppercase tracking-widest text-center">Silêncio no éter...</p>
                  </div>
                ) : notifications.map(n => (
                  <div key={n.id} className="p-4 glass-panel rounded-2xl border-white/5 flex flex-col gap-3 hover:bg-white/[0.03] transition-colors">
                     <div className="flex gap-4">
                        <span className="material-symbols-outlined text-aurora-blue mt-1">{n.icon}</span>
                        <div className="flex-1">
                           <p className="text-xs font-medium leading-relaxed">{n.message}</p>
                           <p className="text-[9px] opacity-40 uppercase font-black mt-1 tracking-widest">{n.time}</p>
                        </div>
                     </div>
                     {n.type === 'CONNECTION_REQUEST' && !user.connections?.includes(n.fromUserId || '') && (
                        <div className="flex gap-2 pl-10">
                           <button 
                             onClick={() => { onAcceptConnection(n.fromUserId!); setShowNotifications(false); }}
                             className="flex-1 py-2 bg-aurora-blue rounded-xl text-[9px] font-black uppercase tracking-widest text-white shadow-glow-blue"
                           >
                             Aceitar Sincronia
                           </button>
                        </div>
                     )}
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
