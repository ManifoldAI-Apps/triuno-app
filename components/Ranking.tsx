
import React, { useState } from 'react';
import { View, User } from '../types';

interface RankingProps {
  setView: (view: View) => void;
  userXP: number;
  onUserClick: (id: string) => void;
  registeredUsers: User[];
}

const Ranking: React.FC<RankingProps> = ({ setView, userXP, onUserClick, registeredUsers }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Ordenar usuários por XP e aplicar busca
  const sortedAndFilteredUsers = registeredUsers
    .filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (b.xp + (b.level * 100)) - (a.xp + (a.level * 100)));

  const topThree = sortedAndFilteredUsers.slice(0, 3);
  const restOfUsers = sortedAndFilteredUsers.slice(3);

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col pb-48 z-10 bg-deep-void overflow-x-hidden">
      <div className="fixed top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none z-0"></div>
      
      <header className="sticky top-0 z-50 glass-panel !bg-deep-void/60 backdrop-blur-xl border-b border-white/5 p-6 md:px-12 pt-8 pb-4 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <button onClick={() => setView(View.DASHBOARD)} className="flex size-10 items-center justify-center rounded-2xl glass-panel text-white active:scale-90 transition-all border-white/10">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="text-xs font-black tracking-[0.3em] uppercase opacity-60">Hall da Ascensão</h1>
            <div className="size-10"></div>
          </div>

          <div className="flex w-full items-center rounded-2xl glass-panel bg-white/5 border border-white/10 h-14 transition-all focus-within:ring-2 ring-aurora-gold/40">
            <div className="pl-4 pr-3 text-text-secondary">
              <span className="material-symbols-outlined text-[22px]">search</span>
            </div>
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex w-full bg-transparent border-none focus:ring-0 text-text-primary placeholder:text-slate-600 text-[11px] font-black uppercase tracking-widest" 
              placeholder="Buscar buscador pelo nome..." 
            />
          </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto z-10 px-6 py-6">
        {sortedAndFilteredUsers.length === 0 ? (
          <div className="py-20 text-center opacity-30">
            <span className="material-symbols-outlined text-6xl mb-4">no_accounts</span>
            <p className="text-sm font-black uppercase tracking-widest">Ninguém ecoou neste canal.</p>
          </div>
        ) : (
          <>
            {/* Podium (Top 3) */}
            {topThree.length > 0 && (
              <div className="flex items-end justify-center gap-3 mb-16 mt-10">
                {/* 2nd Place */}
                {topThree[1] && (
                  <div onClick={() => onUserClick(topThree[1].id)} className="flex flex-col items-center gap-3 cursor-pointer group active:scale-95 transition-all">
                    <div className="relative">
                      <div className="size-20 rounded-[32px] border-2 border-slate-400 p-0.5 bg-slate-900 overflow-hidden shadow-xl">
                        <img className="w-full h-full object-cover rounded-[28px]" src={topThree[1].avatar} alt={topThree[1].name} />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-500 text-white text-[8px] font-black px-3 py-1 rounded-full border border-slate-900">2º LUGAR</div>
                    </div>
                    <p className="text-[10px] font-black tracking-widest uppercase text-slate-400 truncate max-w-[80px] text-center">{topThree[1].name}</p>
                  </div>
                )}

                {/* 1st Place */}
                <div onClick={() => onUserClick(topThree[0].id)} className="flex flex-col items-center gap-4 cursor-pointer group active:scale-95 transition-all -translate-y-4">
                  <div className="relative">
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 material-symbols-outlined text-aurora-gold text-4xl animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>crown</span>
                    <div className="size-28 rounded-[44px] border-4 border-aurora-gold p-1 bg-slate-900 shadow-glow-orange overflow-hidden">
                      <img className="w-full h-full object-cover rounded-[38px] transition-transform duration-700 group-hover:scale-110" src={topThree[0].avatar} alt={topThree[0].name} />
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-aurora-gold text-white text-[10px] font-black px-5 py-1.5 rounded-full border-2 border-slate-900 shadow-xl whitespace-nowrap">LÍDER SUPREMO</div>
                  </div>
                  <p className="text-sm font-black tracking-widest uppercase text-white text-center">{topThree[0].name}</p>
                </div>

                {/* 3rd Place */}
                {topThree[2] && (
                  <div onClick={() => onUserClick(topThree[2].id)} className="flex flex-col items-center gap-3 cursor-pointer group active:scale-95 transition-all">
                    <div className="relative">
                      <div className="size-20 rounded-[32px] border-2 border-aurora-orange/50 p-0.5 bg-slate-900 overflow-hidden shadow-xl">
                        <img className="w-full h-full object-cover rounded-[28px]" src={topThree[2].avatar} alt={topThree[2].name} />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-aurora-orange text-white text-[8px] font-black px-3 py-1 rounded-full border border-slate-900">3º LUGAR</div>
                    </div>
                    <p className="text-[10px] font-black tracking-widest uppercase text-aurora-orange truncate max-w-[80px] text-center">{topThree[2].name}</p>
                  </div>
                )}
              </div>
            )}

            {/* List (Remaining Users) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-12">
              {restOfUsers.map((user, idx) => (
                <div 
                  key={user.id} 
                  onClick={() => onUserClick(user.id)}
                  className="glass-panel group flex items-center gap-4 p-5 rounded-[32px] hover:bg-white/5 active:scale-95 transition-all shadow-lg cursor-pointer border-white/5"
                >
                  <div className="flex items-center justify-center w-8 text-[11px] font-black text-text-secondary opacity-40">{idx + 4}º</div>
                  <div className="size-14 rounded-[24px] bg-slate-800 overflow-hidden shrink-0 border border-white/10 shadow-inner">
                    <img className="w-full h-full object-cover" src={user.avatar} alt={user.name} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-black tracking-widest truncate uppercase text-text-primary group-hover:text-white transition-colors">{user.name}</p>
                    <p className="text-[9px] font-bold text-text-secondary uppercase opacity-40 tracking-[0.2em] mt-1">Ascensão nível {user.level} • {user.xp} XP</p>
                  </div>
                  <div className="size-10 rounded-full bg-white/5 flex items-center justify-center text-aurora-gold border border-white/5">
                    <span className="material-symbols-outlined text-xl">bolt</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Ranking;
