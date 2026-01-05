
import React from 'react';
import { View, User } from '../types';

interface AdminDashboardProps {
  setView: (view: View) => void;
  totalGratitude: number;
  onLogout: () => void;
  user: User;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setView, totalGratitude, onLogout, user }) => {
  // Stats now use placeholders for non-implemented metrics instead of fake values
  const stats = [
    { label: 'Gratidão', val: totalGratitude, icon: 'volunteer_activism', color: 'text-aurora-gold', badge: 'Real' },
    { label: 'Pulsos', val: '0', icon: 'bolt', color: 'text-aurora-blue', badge: 'Hoje' },
    { label: 'Média', val: '-', icon: 'favorite', color: 'text-pink-400', badge: 'Satisfação' }
  ];

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-deep-void">
      <div className="px-6 py-10 overflow-y-auto w-full max-w-4xl mx-auto">
        <header className="mb-10">
          <div className="glass-panel rounded-[32px] px-8 py-5 flex items-center justify-between shadow-2xl border-white/5 bg-gradient-to-r from-slate-800 to-transparent">
            <div>
              <h1 className="text-xs font-black tracking-[0.3em] text-aurora-blue uppercase">{user.name}</h1>
              <p className="text-text-secondary text-[8px] font-bold uppercase tracking-[0.2em] opacity-40">Painel de Controle</p>
            </div>
            <div className="size-10 rounded-2xl ring-1 ring-aurora-blue/20 overflow-hidden shadow-xl">
              <img src={user.avatar} className="object-cover w-full h-full" alt="Avatar" />
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {stats.map(s => (
            <div key={s.label} className="flex flex-col gap-4 rounded-[32px] glass-panel p-6 group transition-all hover:bg-white/5 active:scale-95">
              <div className="flex items-center justify-between">
                <p className="text-text-secondary text-[10px] font-black uppercase tracking-[0.2em] opacity-60">{s.label}</p>
                <div className={`size-10 rounded-xl bg-white/5 flex items-center justify-center ${s.color}`}>
                  <span className="material-symbols-outlined">{s.icon}</span>
                </div>
              </div>
              <p className="text-4xl font-black tracking-tighter text-text-primary">{s.val}</p>
              <div className="text-emerald-400 text-[10px] font-black tracking-widest uppercase flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {s.badge}
              </div>
            </div>
          ))}
        </section>

        <section className="space-y-6">
          <h3 className="px-1 text-sm font-black tracking-[0.3em] text-text-secondary uppercase">Comandos de Mestre</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div onClick={() => setView(View.ADMIN_FORGE)} className="relative h-28 rounded-[32px] overflow-hidden glass-panel cursor-pointer group p-6 flex items-center justify-between border-white/10 hover:border-aurora-gold/30 transition-all active:scale-98">
              <div className="flex items-center gap-5 z-20">
                <div className="size-14 rounded-2xl bg-aurora-gold/20 text-aurora-gold border border-aurora-gold/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">task</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-text-primary font-black tracking-widest uppercase">Forja de Missões</span>
                  <span className="text-text-secondary text-[10px] font-bold uppercase tracking-widest opacity-60">Gerenciar tarefas diárias</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-text-secondary group-hover:translate-x-2 transition-transform">chevron_right</span>
            </div>

            <div onClick={() => setView(View.ADMIN_CALENDAR)} className="relative h-28 rounded-[32px] overflow-hidden glass-panel cursor-pointer group p-6 flex items-center justify-between border-white/10 hover:border-aurora-blue/30 transition-all active:scale-98">
              <div className="flex items-center gap-5 z-20">
                <div className="size-14 rounded-2xl bg-aurora-blue/20 text-aurora-blue border border-aurora-blue/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">event</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-text-primary font-black tracking-widest uppercase">Gerenciar Portal</span>
                  <span className="text-text-secondary text-[10px] font-bold uppercase tracking-widest opacity-60">Lives e Eventos</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-text-secondary group-hover:translate-x-2 transition-transform">chevron_right</span>
            </div>

            <div onClick={() => setView(View.ADMIN_WISDOM)} className="relative h-28 rounded-[32px] overflow-hidden glass-panel cursor-pointer group p-6 flex items-center justify-between border-white/10 hover:border-emerald-500/30 transition-all active:scale-98">
              <div className="flex items-center gap-5 z-20">
                <div className="size-14 rounded-2xl bg-emerald-900/40 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">spa</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-text-primary font-black tracking-widest uppercase">Nova Sabedoria</span>
                  <span className="text-text-secondary text-[10px] font-bold uppercase tracking-widest opacity-60">Alterar frase do dia</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-text-secondary group-hover:translate-x-2 transition-transform">chevron_right</span>
            </div>

            <div onClick={() => setView(View.ADMIN_USERS)} className="relative h-28 rounded-[32px] overflow-hidden glass-panel cursor-pointer group p-6 flex items-center justify-between border-white/10 hover:border-indigo-500/30 transition-all active:scale-98">
              <div className="flex items-center gap-5 z-20">
                <div className="size-14 rounded-2xl bg-indigo-900/40 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">group</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-text-primary font-black tracking-widest uppercase">Gerenciar Usuários</span>
                  <span className="text-text-secondary text-[10px] font-bold uppercase tracking-widest opacity-60">Base de Guardiões</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-text-secondary group-hover:translate-x-2 transition-transform">chevron_right</span>
            </div>

            <div onClick={onLogout} className="relative h-28 col-span-1 md:col-span-2 rounded-[32px] overflow-hidden glass-panel cursor-pointer group p-6 flex items-center justify-center gap-3 border-white/10 hover:bg-red-500/10 hover:border-red-500/20 transition-all active:scale-95">
              <span className="material-symbols-outlined text-red-400 text-2xl">logout</span>
              <span className="text-red-400 font-black tracking-[0.3em] uppercase text-sm">Encerrar Sessão</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
