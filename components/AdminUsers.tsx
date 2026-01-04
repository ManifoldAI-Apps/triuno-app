
import React, { useState } from 'react';
import { User } from '../types';

interface AdminUsersProps {
  onBack: () => void;
  registeredUsers: User[];
}

const AdminUsers: React.FC<AdminUsersProps> = ({ onBack, registeredUsers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Filtragem
  const filteredUsers = registeredUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginação
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reseta para primeira página ao buscar
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-deep-void max-w-md mx-auto">
      <header className="sticky top-0 z-50 glass-panel !bg-deep-void/60 backdrop-blur-xl border-b border-white/5 p-6 md:px-12 pt-12 pb-4 flex items-center justify-between">
        <button onClick={onBack} className="flex size-10 items-center justify-center rounded-2xl glass-panel text-text-primary active:scale-90 transition-all border-white/10">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <h2 className="text-xs font-black tracking-[0.3em] uppercase opacity-60">Gestão de Usuários</h2>
        <div className="size-10"></div>
      </header>

      <div className="px-5 py-6 sticky top-[88px] z-20 bg-deep-void/80 backdrop-blur-sm">
        <div className="flex w-full items-center rounded-2xl glass-panel bg-slate-800/50 border border-white/10 h-14 transition-all focus-within:ring-2 ring-aurora-blue/40">
          <div className="pl-4 pr-3 text-text-secondary">
            <span className="material-symbols-outlined text-[22px]">search</span>
          </div>
          <input 
            value={searchTerm}
            onChange={handleSearch}
            className="flex w-full bg-transparent border-none focus:ring-0 text-text-primary placeholder:text-slate-500 text-sm font-bold uppercase tracking-widest" 
            placeholder="Buscar buscador..." 
          />
        </div>
      </div>

      <div className="flex flex-col flex-1 px-5 gap-3 pb-32 pt-2 overflow-y-auto no-scrollbar">
        {currentUsers.length === 0 ? (
          <div className="py-20 text-center opacity-30">
            <span className="material-symbols-outlined text-5xl mb-4">person_search</span>
            <p className="text-xs font-black uppercase tracking-widest">Nenhuma essência encontrada.</p>
          </div>
        ) : (
          currentUsers.map((u) => (
            <div key={u.id} className={`flex flex-col glass-panel p-5 rounded-3xl shadow-xl border-white/5 ${u.status === 'Inativo' ? 'opacity-40 grayscale' : ''}`}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="relative shrink-0">
                    <img src={u.avatar} className="size-12 rounded-2xl object-cover border border-white/10" alt={u.name} />
                    <span className={`absolute -bottom-1 -right-1 size-3.5 rounded-full border-2 border-slate-900 ${u.status === 'Ativo' ? 'bg-emerald-500 shadow-glow-emerald' : 'bg-slate-500'}`}></span>
                  </div>
                  <div className="flex flex-col truncate">
                    <p className="text-sm font-black text-white uppercase tracking-wide truncate">{u.name}</p>
                    <p className="text-[10px] text-text-secondary font-bold truncate opacity-60">{u.email}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="material-symbols-outlined text-[14px] text-aurora-gold">military_tech</span>
                      <p className="text-text-secondary text-[9px] font-black uppercase tracking-widest">Nível {u.level}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                   <button className="rounded-xl px-4 py-2 bg-white/5 border border-white/10 text-white text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Editar</button>
                   <button className="rounded-xl px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 text-[9px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-all">Banir</button>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Controles de Paginação */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between py-6 pt-10 border-t border-white/5">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-secondary disabled:opacity-20 transition-all"
            >
              <span className="material-symbols-outlined">chevron_left</span>
              Anterior
            </button>
            <span className="text-[10px] font-black text-aurora-blue uppercase tracking-[0.2em]">Página {currentPage} de {totalPages}</span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-secondary disabled:opacity-20 transition-all"
            >
              Próximo
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
