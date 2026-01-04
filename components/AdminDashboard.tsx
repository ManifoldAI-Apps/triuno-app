
import React from 'react';
import { View } from '../types';

interface AdminDashboardProps {
  setView: (view: View) => void;
  totalGratitude: number;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setView, totalGratitude, onLogout }) => {
  const stats = [
    { label: 'Gratidão', val: totalGratitude, icon: 'volunteer_activism', color: 'text-aurora-gold', badge: 'Real' },
    { label: 'Pulsos', val: '12', icon: 'bolt', color: 'text-aurora-blue', badge: 'Hoje' },
    { label: 'Média', val: '9.2', icon: 'favorite', color: 'text-pink-400', badge: 'Satisfação' }
  ];

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-deep-void">
      <div className="fixed left-3 top-10 bottom-3 w-[72px] glass-panel z-50 flex flex-col items-center py-8 gap-10 rounded-[32px] border-white/10 shadow-2xl">
        <div className="mt-2 group">
          <div className="size-12 rounded-2xl bg-aurora-blue/20 border border-aurora-blue/30 flex items-center justify-center transition-all group-hover:shadow-glow-blue">
            <span className="material-symbols-outlined text-aurora-blue text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>shield_person</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-8 w-full items-center flex-1 justify-center">
          <button onClick={() => setView(View.ADMIN_DASHBOARD)} className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 text-white shadow-glow-blue border border-white/10 active:scale-90 transition-all">
            <span className="material-symbols-outlined">dashboard</span>
          </button>
          <button onClick={() => setView(View.ADMIN_CALENDAR)} className="flex items-center justify-center w-12 h-12 rounded-2xl text-text-secondary hover:text-white active:scale-90 transition-all">
            <span className="material-symbols-outlined">calendar_today</span>
          </button>
          <button onClick={() => setView(View.ADMIN_USERS)} className="flex items-center justify-center w-12 h-12 rounded-2xl text-text-secondary hover:text-white active:scale-90 transition-all">
            <span className="material-symbols-outlined">group</span>
          </button>
          <button onClick={() => setView(View.ADMIN_FORGE)} className="flex items-center justify-center w-12 h-12 rounded-2xl text-text-secondary hover:text-white active:scale-90 transition-all">
            <span className="material-symbols-outlined">construction</span>
          </button>
        </div>

        <button onClick={onLogout} className="flex items-center justify-center w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 active:scale-90 transition-all">
          <span className="material-symbols-outlined">logout</span>
        </button>
      </div>

      <div className="pl-[96px] pr-6 pt-10 pb-12 overflow-y-auto w-full max-w-4xl mx-auto">
        <header className="mb-10">
          <div className="glass-panel rounded-[32px] px-8 py-5 flex items-center justify-between shadow-2xl border-white/5 bg-gradient-to-r from-slate-800 to-transparent">
            <div>
              <h1 className="text-xs font-black tracking-[0.3em] text-aurora-blue uppercase">Guardião Mor</h1>
              <p className="text-text-secondary text-[8px] font-bold uppercase tracking-[0.2em] opacity-40">Painel de Controle</p>
            </div>
            <div className="size-10 rounded-2xl ring-1 ring-aurora-blue/20 overflow-hidden shadow-xl">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy27OZRVPYL9uLDgzs8XFelX0f7WyvaF6fP5w5zXYZiKuFIgpr0tPEJEx88kHpLbvlfcXybO6dq6AguVjQiCvybvkO6np1ey2qPISQj11Jh36s-dJqSgJtuhkrCnl8Mgcx9o1tY-0t5sWaDjP6YxwYLjQ_z-bKLPDtbQJrEWBa1xEELWHt1cKgc2B8rvktpKQtLMem7sbdiFgpJkKy6eRPv4pkYNaxmGeVlZ8gOhMFIU9hpJHPxUYcDOFpvP8bDQQ0I2V1O6ROQtCE" className="object-cover w-full h-full" alt="Avatar" />
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
