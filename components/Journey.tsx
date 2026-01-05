
import React, { useState } from 'react';
import { View, User, Task } from '../types';

interface JourneyProps {
  setView: (view: View) => void;
  user: User;
  tasks: Task[];
  onLogout: () => void;
  onUpdateUser: (data: Partial<User>) => void;
  onSupport: () => void;
}

const PREDEFINED_AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
];

const TriangleGraph: React.FC<{ values: { corpo: number; alma: number; espirito: number } }> = ({ values }) => {
  const size = 200;
  const center = size / 2;
  const radius = center - 20;

  const pCorpo = { x: center, y: center - radius };
  const pAlma = { x: center - radius * Math.cos(Math.PI / 6), y: center + radius * Math.sin(Math.PI / 6) };
  const pEspirito = { x: center + radius * Math.cos(Math.PI / 6), y: center + radius * Math.sin(Math.PI / 6) };

  const calcPoint = (p: { x: number; y: number }, val: number) => {
    const factor = val / 100;
    return {
      x: center + (p.x - center) * factor,
      y: center + (p.y - center) * factor
    };
  };

  const vCorpo = calcPoint(pCorpo, values.corpo);
  const vAlma = calcPoint(pAlma, values.alma);
  const vEspirito = calcPoint(pEspirito, values.espirito);

  const pointsString = `${vCorpo.x},${vCorpo.y} ${vAlma.x},${vAlma.y} ${vEspirito.x},${vEspirito.y}`;

  return (
    <div className="relative flex items-center justify-center p-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-2xl">
        <polygon points={`${pCorpo.x},${pCorpo.y} ${pAlma.x},${pAlma.y} ${pEspirito.x},${pEspirito.y}`} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <line x1={center} y1={center} x2={pCorpo.x} y2={pCorpo.y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1={center} y1={center} x2={pAlma.x} y2={pAlma.y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1={center} y1={center} x2={pEspirito.x} y2={pEspirito.y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
        <polygon points={pointsString} fill="url(#gradAscension)" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="2" className="transition-all duration-1000 ease-in-out" />
        <circle cx={vCorpo.x} cy={vCorpo.y} r="3" fill="#10B981" />
        <circle cx={vAlma.x} cy={vAlma.y} r="3" fill="#F97316" />
        <circle cx={vEspirito.x} cy={vEspirito.y} r="3" fill="#38BDF8" />
        <defs>
          <linearGradient id="gradAscension" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.4)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.4)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute -top-4 flex flex-col items-center">
        <span className="text-[8px] font-black uppercase text-emerald-400 tracking-widest">Corpo</span>
        <span className="text-[10px] font-black text-emerald-400/80">{values.corpo}%</span>
      </div>
      <div className="absolute -bottom-4 -left-6 flex flex-col items-center">
        <span className="text-[8px] font-black uppercase text-aurora-orange tracking-widest">Alma</span>
        <span className="text-[10px] font-black text-aurora-orange/80">{values.alma}%</span>
      </div>
      <div className="absolute -bottom-4 -right-6 flex flex-col items-center">
        <span className="text-[8px] font-black uppercase text-aurora-blue tracking-widest">Espírito</span>
        <span className="text-[10px] font-black text-aurora-blue/80">{values.espirito}%</span>
      </div>
    </div>
  );
};

const Journey: React.FC<JourneyProps> = ({ setView, user, tasks, onLogout, onUpdateUser, onSupport }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    avatar: user.avatar,
    bio: user.bio || '',
    city: user.city || '',
    state: user.state || ''
  });

  const handleSave = () => {
    onUpdateUser({
      name: formData.name.trim() || user.name,
      avatar: formData.avatar.trim() || user.avatar,
      bio: formData.bio.trim(),
      city: formData.city.trim(),
      state: formData.state.trim().toUpperCase()
    });
    setIsEditing(false);
  };

  const evolutionValues = {
    corpo: 85,
    alma: 60,
    espirito: 92
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-48 bg-deep-void">
      <header className="sticky top-0 z-50 glass-panel !bg-deep-void/60 backdrop-blur-xl border-b border-white/5 p-6 md:px-12 pt-8 pb-4 flex items-center justify-between">
        <button onClick={() => setView(View.DASHBOARD)} className="flex items-center justify-center w-10 h-10 rounded-2xl glass-panel text-white active:scale-90 transition-all border-white/10">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xs font-black tracking-[0.3em] uppercase opacity-60">Senda da Alma</h1>
        <div className="flex items-center gap-2">
          <button onClick={onSupport} className="flex size-10 items-center justify-center rounded-2xl glass-panel text-aurora-gold border-aurora-gold/20 active:scale-90 transition-all">
            <span className="material-symbols-outlined text-[20px]">help</span>
          </button>
          <button
            onMouseDown={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`flex items-center justify-center w-10 h-10 rounded-2xl border transition-all active:scale-90 ${isEditing ? 'bg-aurora-blue text-white border-aurora-blue shadow-glow-blue' : 'glass-panel border-white/10 text-white'}`}
          >
            <span className="material-symbols-outlined">{isEditing ? 'check' : 'edit'}</span>
          </button>
        </div>
      </header>

      <main className="relative z-10 flex flex-col items-center pt-10 pb-6 px-6">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-aurora-blue/20 blur-[60px] rounded-full animate-pulse"></div>
          <div className="size-32 rounded-[40px] border-2 border-white/10 shadow-2xl relative z-10 overflow-hidden bg-slate-900 group">
            <img
              src={isEditing ? formData.avatar : user.avatar}
              alt={user.name}
              className="w-full h-full object-cover transition-all duration-500"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200?text=Buscador'; }}
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                <span className="material-symbols-outlined text-white text-3xl animate-pulse">add_a_photo</span>
              </div>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="w-full flex flex-col gap-6 animate-fade-in max-w-sm">
            {/* Gallery of Avatars */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black uppercase text-text-secondary pl-2 tracking-widest">Escolha sua Essência Visual</label>
              <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar px-1">
                {PREDEFINED_AVATARS.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => setFormData({ ...formData, avatar: url })}
                    className={`size-14 rounded-2xl overflow-hidden shrink-0 border-2 transition-all active:scale-90 ${formData.avatar === url ? 'border-aurora-blue shadow-glow-blue' : 'border-white/10 opacity-50'}`}
                  >
                    <img src={url} className="size-full object-cover" alt={`Avatar ${idx}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase text-text-secondary pl-2">Ou cole um Link de Imagem</label>
              <div className="flex gap-2">
                <input value={formData.avatar} onChange={e => setFormData({ ...formData, avatar: e.target.value })} className="w-full glass-panel bg-white/5 px-4 h-12 rounded-xl text-white outline-none focus:ring-1 focus:ring-aurora-blue/40 transition-all text-xs" placeholder="https://exemplo.com/sua-foto.jpg" />
                <label className="flex items-center justify-center w-12 h-12 rounded-xl glass-panel border-white/10 cursor-pointer hover:bg-white/10 active:scale-95 transition-all">
                  <span className="material-symbols-outlined text-white">upload</span>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 500 * 1024) { // 500KB limit for Base64 safety
                        alert("A imagem deve ter no máximo 500KB.");
                        return;
                      }
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData({ ...formData, avatar: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }} />
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase text-text-secondary pl-2">Nome de Luz</label>
              <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full glass-panel bg-white/5 px-4 h-12 rounded-xl text-white outline-none focus:ring-1 focus:ring-aurora-blue/40 transition-all" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase text-text-secondary pl-2">Sua Missão (Bio)</label>
              <textarea value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} className="w-full glass-panel bg-white/5 p-4 rounded-xl text-white outline-none focus:ring-1 focus:ring-aurora-blue/40 min-h-[100px] resize-none transition-all" placeholder="Qual sua missão neste plano?" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black uppercase text-text-secondary pl-2">Cidade</label>
                <input value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} className="w-full glass-panel bg-white/5 px-4 h-12 rounded-xl text-white outline-none transition-all" placeholder="Ex: São Paulo" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black uppercase text-text-secondary pl-2">UF</label>
                <input maxLength={2} value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} className="w-full glass-panel bg-white/5 px-4 h-12 rounded-xl text-white outline-none uppercase transition-all" placeholder="SP" />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center flex flex-col items-center">
            <h2 className="text-2xl font-black uppercase tracking-tight">{user.name}</h2>
            <div className="flex items-center gap-2 mt-1 opacity-60">
              <span className="material-symbols-outlined text-xs">location_on</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">{user.city || 'Desconhecido'}, {user.state || 'UF'}</span>
            </div>
            {user.bio && <p className="mt-4 text-text-secondary italic font-serif text-lg leading-relaxed max-w-[80%]">"{user.bio}"</p>}
          </div>
        )}
      </main>

      <section className="px-6 pb-6 flex flex-col items-center">
        <div className="w-full max-w-xs glass-panel p-8 rounded-[40px] border-white/5 flex flex-col items-center gap-6 shadow-2xl bg-gradient-to-b from-white/[0.03] to-transparent">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-aurora-blue">Triângulo de Ascensão</p>
          <TriangleGraph values={evolutionValues} />
          <p className="text-[9px] font-medium text-text-secondary text-center opacity-50 uppercase tracking-widest leading-relaxed mt-4">Sua evolução geral consolidada nos três pilares sagrados.</p>
        </div>
      </section>

      <section className="px-6 space-y-4 relative z-10">
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-panel p-4 rounded-3xl text-center border-white/5">
            <p className="text-[10px] font-black text-text-secondary uppercase mb-1 tracking-widest">Conexões</p>
            <p className="text-xl font-bold text-white">{(user.connections || []).length}</p>
          </div>
          <div className="glass-panel p-4 rounded-3xl text-center border-white/5">
            <p className="text-[10px] font-black text-text-secondary uppercase mb-1 tracking-widest">Nível</p>
            <p className="text-xl font-bold text-aurora-gold">{user.level}</p>
          </div>
        </div>

        <button onClick={onLogout} className="w-full py-5 rounded-[28px] border border-aurora-orange/20 bg-aurora-orange/5 text-aurora-orange flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg hover:bg-aurora-orange/10">
          <span className="material-symbols-outlined">logout</span>
          <span className="text-xs font-black uppercase tracking-[0.2em]">Sair do Portal</span>
        </button>
      </section>
    </div>
  );
};

export default Journey;
