
import React from 'react';
import { User } from '../types';

interface UserProfileProps {
  user: User;
  profile: User;
  onBack: () => void;
  onRequestConnection: (id: string) => void;
  onMessage: (id: string) => void;
}

const TriangleGraph: React.FC<{ values: { corpo: number; alma: number; espirito: number } }> = ({ values }) => {
  const size = 180;
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
    <div className="relative flex items-center justify-center p-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-xl">
        <polygon
          points={`${pCorpo.x},${pCorpo.y} ${pAlma.x},${pAlma.y} ${pEspirito.x},${pEspirito.y}`}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
        />
        <line x1={center} y1={center} x2={pCorpo.x} y2={pCorpo.y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1={center} y1={center} x2={pAlma.x} y2={pAlma.y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1={center} y1={center} x2={pEspirito.x} y2={pEspirito.y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 3" />

        <polygon
          points={pointsString}
          fill="rgba(245, 158, 11, 0.2)"
          stroke="rgba(245, 158, 11, 0.4)"
          strokeWidth="2"
        />

        <circle cx={vCorpo.x} cy={vCorpo.y} r="2.5" fill="#10B981" />
        <circle cx={vAlma.x} cy={vAlma.y} r="2.5" fill="#F97316" />
        <circle cx={vEspirito.x} cy={vEspirito.y} r="2.5" fill="#38BDF8" />
      </svg>

      {/* Rótulos com Porcentagens */}
      <div className="absolute top-0 flex flex-col items-center">
        <span className="text-[7px] font-black uppercase text-emerald-400/60 tracking-tighter">Corpo</span>
        <span className="text-[8px] font-bold text-emerald-400/40">{values.corpo}%</span>
      </div>
      <div className="absolute bottom-0 -left-4 flex flex-col items-center">
        <span className="text-[7px] font-black uppercase text-aurora-orange/60 tracking-tighter">Alma</span>
        <span className="text-[8px] font-bold text-aurora-orange/40">{values.alma}%</span>
      </div>
      <div className="absolute bottom-0 -right-4 flex flex-col items-center">
        <span className="text-[7px] font-black uppercase text-aurora-blue/60 tracking-tighter">Espírito</span>
        <span className="text-[8px] font-bold text-aurora-blue/40">{values.espirito}%</span>
      </div>
    </div>
  );
};

const UserProfile: React.FC<UserProfileProps> = ({ user, profile, onBack, onRequestConnection, onMessage }) => {
  const isConnected = (user.connections || []).includes(profile.id);
  const isRequestSent = (user.sentRequests || []).includes(profile.id);
  const isPendingMyAcceptance = (user.pendingRequests || []).includes(profile.id);

  // Mock de evolução para o perfil visualizado
  const profileEvolution = {
    corpo: Math.min(100, profile.level * 5),
    alma: Math.min(100, profile.level * 5),
    espirito: Math.min(100, profile.level * 5)
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-deep-void overflow-x-hidden">
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 pt-10 pb-4 bg-deep-void/40 backdrop-blur-2xl border-b border-white/5">
        <button onClick={onBack} className="size-10 flex items-center justify-center rounded-2xl glass-panel text-white active:scale-90">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-[10px] font-black tracking-[0.2em] uppercase opacity-40">Perfil do Buscador</h1>
        <div className="size-10"></div>
      </header>

      <main className="flex flex-col items-center pt-12 px-6">
        <div className="relative mb-8">
          <div className="absolute -inset-4 bg-aurora-blue/10 blur-3xl rounded-full"></div>
          <div className="size-36 rounded-[44px] border border-white/10 p-1 relative z-10">
            <img src={profile.avatar} className="w-full h-full object-cover rounded-[40px]" alt={profile.name} />
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-black uppercase text-white tracking-tighter">{profile.name}</h2>
          <div className="flex items-center justify-center gap-2 mt-1 text-aurora-blue opacity-80">
            <span className="material-symbols-outlined text-sm">location_on</span>
            <span className="text-[10px] font-black uppercase tracking-widest">{profile.city || 'Desconhecido'}, {profile.state || 'UF'}</span>
          </div>
          {profile.bio && (
            <p className="mt-4 text-text-secondary italic font-serif text-lg leading-relaxed max-w-[280px] mx-auto opacity-70">
              "{profile.bio}"
            </p>
          )}
        </div>

        <div className="w-full max-w-sm glass-panel p-6 rounded-[40px] border-white/5 flex flex-col items-center gap-4 mb-8 bg-gradient-to-t from-slate-900/40 to-transparent">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-aurora-gold opacity-60">Equilíbrio do Ser</p>
          <TriangleGraph values={profileEvolution} />
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-12">
          <div className="glass-panel p-5 rounded-[32px] text-center border-white/5">
            <p className="text-[9px] font-black text-text-secondary uppercase mb-1 opacity-50">Nível</p>
            <p className="text-2xl font-black text-aurora-gold leading-none">{profile.level}</p>
          </div>
          <div className="glass-panel p-5 rounded-[32px] text-center border-white/5">
            <p className="text-[9px] font-black text-text-secondary uppercase mb-1 opacity-50">Sincronias</p>
            <p className="text-2xl font-black text-white leading-none">{(profile.connections || []).length}</p>
          </div>
        </div>

        <div className="flex flex-col w-full max-w-sm gap-3 pb-20">
          {isConnected ? (
            <button
              onClick={() => onMessage(profile.id)}
              className="w-full py-5 rounded-[28px] bg-gradient-to-r from-aurora-blue to-aurora-purple text-white font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 active:scale-95 transition-all shadow-glow-blue"
            >
              <span className="material-symbols-outlined text-xl">chat_bubble</span>
              Enviar Eco de Luz
            </button>
          ) : isPendingMyAcceptance ? (
            <div className="text-center p-4 rounded-3xl bg-aurora-gold/10 border border-aurora-gold/20">
              <p className="text-[10px] font-black uppercase tracking-widest text-aurora-gold">Aceite nas notificações para ecoar.</p>
            </div>
          ) : (
            <button
              onClick={() => !isRequestSent && onRequestConnection(profile.id)}
              disabled={isRequestSent}
              className={`w-full py-5 rounded-[28px] font-black text-[11px] uppercase tracking-[0.3em] transition-all active:scale-95 shadow-lg flex items-center justify-center gap-3 ${isRequestSent ? 'bg-white/5 text-text-secondary border border-white/10 opacity-60' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
            >
              <span className="material-symbols-outlined text-xl">{isRequestSent ? 'hourglass_top' : 'sync'}</span>
              {isRequestSent ? 'Solicitação Enviada' : 'Solicitar Sincronia'}
            </button>
          )}

          {!isConnected && (
            <p className="text-[9px] text-center font-black uppercase tracking-widest opacity-20">Aguarde a sincronia para conversar.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
