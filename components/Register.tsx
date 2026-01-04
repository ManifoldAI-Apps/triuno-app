
import React, { useState } from 'react';

interface RegisterProps {
  onRegister: (name: string, email: string, pass: string) => boolean;
  onGoToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onGoToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onRegister(name, email, pass);
    if (!success) {
      setError('Este e-mail já possui uma essência registrada.');
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen w-full max-w-md mx-auto bg-deep-void overflow-hidden shadow-2xl justify-center px-6">
      <div className="absolute top-8 left-6 z-20">
        <button 
          onClick={onGoToLogin} 
          className="size-12 rounded-2xl glass-panel flex items-center justify-center text-text-secondary hover:text-white transition-all active:scale-90"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      </div>

      <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[40%] bg-gradient-to-t from-aurora-purple/20 to-transparent blur-[80px] rounded-full pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col gap-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-[32px] font-black tracking-widest uppercase text-white mb-2">Nova Conta</h1>
          <p className="text-text-secondary text-xs font-black uppercase tracking-[0.3em] opacity-60">Inicie sua Jornada Triuna</p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary pl-4">Nome Completo</label>
            <input 
              type="text" 
              required
              className="w-full glass-panel bg-white/5 px-6 h-14 rounded-2xl text-text-primary outline-none focus:ring-1 focus:ring-aurora-purple/50 transition-all"
              placeholder="Digite seu nome"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary pl-4">E-mail</label>
            <input 
              type="email" 
              required
              className="w-full glass-panel bg-white/5 px-6 h-14 rounded-2xl text-text-primary outline-none focus:ring-1 focus:ring-aurora-purple/50 transition-all"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary pl-4">Senha</label>
            <input 
              type="password" 
              required
              className="w-full glass-panel bg-white/5 px-6 h-14 rounded-2xl text-text-primary outline-none focus:ring-1 focus:ring-aurora-purple/50 transition-all"
              placeholder="Mínimo 8 caracteres"
              value={pass}
              onChange={e => setPass(e.target.value)}
            />
          </div>

          {error && <p className="text-red-400 text-[10px] font-black uppercase tracking-widest text-center animate-pulse">{error}</p>}

          <button 
            type="submit"
            className="w-full h-14 bg-gradient-to-r from-aurora-purple to-aurora-blue text-white font-black text-xs tracking-[0.3em] rounded-2xl shadow-glow-blue uppercase active:scale-95 transition-all mt-4"
          >
            Criar Conta
          </button>
        </form>

        <div className="flex flex-col items-center gap-6 mt-4">
          <div className="h-px w-20 bg-white/10"></div>
          <button 
            onClick={onGoToLogin}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-text-secondary hover:text-white transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">login</span>
            <span className="text-[10px] font-black uppercase tracking-widest">Já tenho conta</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
