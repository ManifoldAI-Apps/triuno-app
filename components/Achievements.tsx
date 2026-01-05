
import React from 'react';
import { View, User } from '../types';

interface AchievementsProps {
  user: User;
  setView: (view: View) => void;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  xp: number;
  icon: string;
  unlocked: boolean;
  progress: number;
  total: number;
}

const Achievements: React.FC<AchievementsProps> = ({ user, setView }) => {
  const getLevelTitle = (level: number) => {
    if (level < 5) return "Iniciado do Éter";
    if (level < 15) return "Buscador da Senda";
    if (level < 30) return "Guardião da Chama";
    if (level < 50) return "Mestre Triuno";
    return "Ascendido Supremo";
  };

  const nextLevels = [
    { level: user.level + 1, xpRequired: 100, title: getLevelTitle(user.level + 1) },
    { level: user.level + 2, xpRequired: 200, title: getLevelTitle(user.level + 2) },
    { level: user.level + 3, xpRequired: 300, title: getLevelTitle(user.level + 3) },
  ];

  // Achievements now dynamic based on user stats
  const achievementList: Achievement[] = [
    {
      id: '1',
      title: 'Pioneiro Triuno',
      description: 'Realizar o Voto de Ascensão e selar o destino.',
      xp: 100,
      icon: 'history_edu',
      unlocked: !!user.hasAcceptedCommitment,
      progress: user.hasAcceptedCommitment ? 1 : 0,
      total: 1
    },
    {
      id: '4',
      title: 'Sincronia Perfeita',
      description: 'Conectar-se com 5 novos buscadores.',
      xp: 120,
      icon: 'sync',
      unlocked: (user.connections?.length || 0) >= 5,
      progress: (user.connections?.length || 0),
      total: 5
    }
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-deep-void overflow-x-hidden pt-safe pb-48">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.1)_0%,transparent_60%)] pointer-events-none z-0"></div>

      <header className="sticky top-0 z-50 glass-panel !bg-deep-void/60 backdrop-blur-xl border-b border-white/5 p-6 md:px-12 pt-8 pb-4 flex items-center justify-between">
        <button onClick={() => setView(View.DASHBOARD)} className="size-10 flex items-center justify-center rounded-2xl glass-panel text-white active:scale-90 transition-all border-white/10">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xs font-black tracking-[0.3em] uppercase opacity-60">Cripta de Conquistas</h1>
        <div className="size-10"></div>
      </header>

      <main className="relative z-10 w-full max-w-2xl mx-auto px-6 py-8">
        {/* XP Status Header */}
        <section className="glass-panel p-8 rounded-[40px] border-aurora-purple/20 bg-gradient-to-br from-aurora-purple/5 to-transparent shadow-2xl mb-10 flex flex-col items-center text-center">
          <div className="relative size-32 mb-6">
            <svg className="size-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5"></circle>
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="url(#purpleGrad)"
                strokeWidth="2.5"
                strokeDasharray={`${user.xp}, 100`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              ></circle>
              <defs>
                <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#38BDF8" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white">{user.level}</span>
              <span className="text-[8px] font-black uppercase tracking-widest text-aurora-blue">Nível</span>
            </div>
          </div>

          <h2 className="text-xl font-black uppercase tracking-tight text-white mb-1">{getLevelTitle(user.level)}</h2>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-aurora-purple mb-6 opacity-80">Rumo à Plenitude</p>

          <div className="w-full space-y-2">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-text-secondary px-1">
              <span>Expansão de Luz</span>
              <span>{user.xp} / 100 XP</span>
            </div>
            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-aurora-purple to-aurora-blue rounded-full transition-all duration-1000 shadow-glow-blue"
                style={{ width: `${user.xp}%` }}
              ></div>
            </div>
          </div>
        </section>

        {/* Level Legend */}
        <section className="mb-12">
          <h3 className="text-xs font-black text-text-secondary tracking-[0.3em] uppercase mb-6 px-2">Senda Hierárquica</h3>
          <div className="grid grid-cols-1 gap-3">
            {nextLevels.map((lvl) => (
              <div key={lvl.level} className="flex items-center justify-between p-4 glass-panel rounded-2xl border-white/5 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default group">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-slate-800 flex items-center justify-center text-aurora-gold border border-white/10">
                    <span className="text-xs font-black">{lvl.level}</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white">{lvl.title}</p>
                    <p className="text-[8px] font-medium text-text-secondary uppercase tracking-tighter">Requer {lvl.xpRequired} XP extra</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-text-secondary/40 group-hover:text-aurora-gold transition-colors">lock</span>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements List */}
        <section>
          <h3 className="text-xs font-black text-text-secondary tracking-[0.3em] uppercase mb-6 px-2">Símbolos de Glória</h3>
          <div className="space-y-4">
            {achievementList.map((ach) => (
              <div key={ach.id} className={`glass-panel p-5 rounded-[32px] border-white/5 flex items-center gap-5 transition-all shadow-xl ${!ach.unlocked ? 'opacity-60' : 'bg-gradient-to-r from-white/[0.03] to-transparent'}`}>
                <div className={`size-16 rounded-[24px] flex items-center justify-center shrink-0 border shadow-inner ${ach.unlocked ? 'bg-aurora-gold/10 border-aurora-gold/40 text-aurora-gold shadow-glow-orange' : 'bg-slate-800 border-white/10 text-text-secondary'}`}>
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: ach.unlocked ? "'FILL' 1" : "'FILL' 0" }}>{ach.icon}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-black uppercase tracking-wide text-white truncate">{ach.title}</h4>
                    {ach.unlocked ? (
                      <span className="text-[8px] font-black bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 uppercase">ALCANÇADO</span>
                    ) : (
                      <span className="text-[8px] font-black text-aurora-gold uppercase">+{ach.xp} XP</span>
                    )}
                  </div>
                  <p className="text-[10px] text-text-secondary leading-relaxed line-clamp-2 mb-3">{ach.description}</p>

                  {!ach.unlocked && (
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-aurora-gold transition-all duration-700"
                        style={{ width: `${(ach.progress / ach.total) * 100}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Achievements;
