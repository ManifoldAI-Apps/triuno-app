
import React, { useState } from 'react';
import { User } from '../types';

interface CommitmentProps {
  user: User;
  onNext: () => void;
}

const Commitment: React.FC<CommitmentProps> = ({ user, onNext }) => {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-deep-void overflow-y-auto no-scrollbar pt-safe pb-safe">
      {/* Ambiente de Fundo */}
      <div className="absolute inset-0 pointer-events-none z-0 fixed">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(245,158,11,0.15)_0%,transparent_50%),radial-gradient(circle_at_50%_80%,rgba(168,85,247,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center px-8 py-12 max-w-md mx-auto w-full">
        {/* Alerta de Consciência */}
        <div className="w-full mb-8 p-4 rounded-2xl bg-aurora-orange/10 border border-aurora-orange/20 flex items-start gap-4 animate-fade-in">
          <span className="material-symbols-outlined text-aurora-orange animate-pulse">priority_high</span>
          <p className="text-[11px] font-bold text-aurora-orange uppercase tracking-widest leading-relaxed">
            Aviso: Este não é um contrato com um aplicativo, mas um pacto sagrado entre você e sua própria consciência.
          </p>
        </div>

        <div className="mb-10 text-center animate-slide-up">
          <div className="inline-block p-5 rounded-full bg-aurora-gold/10 border border-aurora-gold/30 mb-6 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
            <span className="material-symbols-outlined text-aurora-gold text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>history_edu</span>
          </div>
          <h1 className="text-white font-black text-3xl tracking-[0.2em] uppercase drop-shadow-lg">
            O VOTO DE ASCENSÃO
          </h1>
          <p className="text-aurora-gold text-[10px] font-black tracking-[0.4em] uppercase mt-3 opacity-80">
            Pacto de Responsabilidade Individual
          </p>
        </div>

        <div className="glass-panel w-full p-8 rounded-[40px] border-white/10 shadow-2xl relative overflow-hidden bg-slate-900/60 backdrop-blur-2xl mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-aurora-gold/30 to-transparent"></div>
          
          <div className="space-y-8 text-center">
            <p className="text-text-primary font-serif italic text-2xl leading-snug">
              "Eu, <span className="text-aurora-gold font-bold not-italic">{user.name || 'Guardião'}</span>, dou minha palavra de que buscarei minha melhor versão a cada novo amanhecer."
            </p>
            
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto"></div>
            
            <div className="space-y-4">
              <p className="text-text-secondary text-sm font-medium leading-relaxed italic opacity-80">
                Comprometo-me a não buscar atalhos, a ser honesto com meus fracassos e persistente em minhas vitórias sobre o <span className="text-white font-bold">Corpo, Alma e Espírito</span>.
              </p>
            </div>

            <div className="pt-4">
              <button 
                onClick={() => setAccepted(!accepted)}
                className="flex items-center justify-center gap-4 w-full p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-aurora-gold/40 transition-all group active:scale-95"
              >
                <div className={`size-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${accepted ? 'bg-aurora-gold border-aurora-gold shadow-glow-orange' : 'border-white/20'}`}>
                  {accepted && <span className="material-symbols-outlined text-white text-xl font-black">done_all</span>}
                </div>
                <div className="text-left">
                  <span className={`block text-[11px] font-black uppercase tracking-widest transition-colors ${accepted ? 'text-white' : 'text-text-secondary'}`}>
                    Compreendo e Aceito
                  </span>
                  <span className="block text-[9px] text-text-secondary/60 uppercase font-bold tracking-tighter">Minha palavra é minha lei</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Botão de Finalização no fluxo de scroll */}
        <div className="w-full flex flex-col items-center gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <button 
            onClick={() => accepted && onNext()}
            disabled={!accepted}
            className={`group relative w-full py-6 rounded-[32px] flex items-center justify-center gap-4 transition-all duration-700 overflow-hidden shadow-2xl ${accepted ? 'bg-gradient-to-r from-aurora-gold to-orange-600 text-white shadow-glow-orange scale-100 opacity-100' : 'bg-slate-800 text-slate-500 opacity-40 cursor-not-allowed'}`}
          >
            {accepted && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>}
            <span className="text-sm font-black uppercase tracking-[0.4em] relative z-10">Selar Meu Destino</span>
            <span className="material-symbols-outlined relative z-10 text-2xl group-hover:rotate-12 transition-transform">verified_user</span>
          </button>
          
          <p className="text-[10px] text-text-secondary/40 font-bold uppercase tracking-[0.2em] text-center px-4">
            Uma vez selado, este portal se fechará e você será levado ao Dashboard de sua ascensão.
          </p>
        </div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Commitment;
