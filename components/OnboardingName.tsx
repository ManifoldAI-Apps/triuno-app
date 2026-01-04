
import React, { useState } from 'react';

interface OnboardingNameProps {
  onNext: (name: string) => void;
}

const OnboardingName: React.FC<OnboardingNameProps> = ({ onNext }) => {
  const [name, setName] = useState('');

  return (
    <div className="relative flex flex-grow flex-col justify-between w-full max-w-md mx-auto min-h-screen bg-deep-void">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(34,211,238,0.12)_0%,rgba(168,85,247,0.08)_45%,rgba(15,23,26,0)_75%)]"></div>
      </div>

      <header className="flex flex-col w-full pt-8 px-6 pb-2 z-20">
        <div className="flex items-center justify-between mb-8">
          <button className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full text-text-secondary hover:text-white hover:bg-white/10 transition-all">
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <button className="text-sm font-semibold tracking-wide text-text-secondary hover:text-text-primary">Pular</button>
        </div>
        <div className="flex w-full flex-row items-center gap-2 mb-4">
          <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_8px_rgba(34,211,238,0.4)]"></div>
          <div className="h-1 flex-1 rounded-full bg-white/10"></div>
          <div className="h-1 flex-1 rounded-full bg-white/10"></div>
          <div className="h-1 flex-1 rounded-full bg-white/10"></div>
        </div>
      </header>

      <main className="flex-grow flex flex-col px-6 pb-6 pt-4 z-10">
        <div className="mt-2 mb-10 animate-[fadeInUp_0.6s_ease-out]">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-[11px] font-bold tracking-[0.2em] text-cyan-300 uppercase bg-cyan-950/30 rounded-full border border-cyan-500/20">
            Passo 1
          </div>
          <h1 className="text-text-primary text-[36px] font-bold leading-[1.1] mb-3 drop-shadow-lg tracking-wider">
            Qual o seu nome?
          </h1>
          <p className="text-text-secondary text-lg font-medium leading-relaxed max-w-[90%]">
            Vamos configurar seu perfil para a jornada no Triuno.
          </p>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <div className="relative flex flex-col w-full">
            <input 
              autoFocus
              className="peer flex w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-text-primary placeholder-transparent h-[72px] px-5 pt-6 pb-2 text-xl font-medium focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all"
              id="displayName"
              placeholder="Nome ou apelido"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label 
              htmlFor="displayName"
              className="absolute left-5 top-[24px] text-text-secondary text-lg cursor-text transition-all duration-300 origin-[0] peer-focus:-translate-y-3.5 peer-focus:scale-75 peer-focus:text-cyan-300 peer-[:not(:placeholder-shown)]:-translate-y-3.5 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:text-cyan-300"
            >
              Nome ou apelido
            </label>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-cyan-400 opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-[20px]">edit</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full px-6 pb-10 pt-4 z-20">
        <button 
          onClick={() => name.trim() && onNext(name)}
          className="group relative w-full flex items-center justify-center h-14 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white text-sm font-bold tracking-[0.15em] uppercase shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!name.trim()}
        >
          <span className="relative z-10 mr-3">CONFIRMAR RITUAL</span>
          <span className="material-symbols-outlined relative z-10 text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
        </button>
        <div className="mt-6 text-center px-4">
          <p className="text-[10px] leading-relaxed text-text-secondary font-medium">
            Ao continuar, você concorda com nossos <a className="underline hover:text-cyan-300" href="#">Termos</a> e <a className="underline hover:text-cyan-300" href="#">Política de Privacidade</a>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default OnboardingName;
