
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string, pass: string) => boolean;
  onGoToRegister: () => void;
  onGoToForgotPassword: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onGoToRegister, onGoToForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onLogin(email, pass);
    if (!success) {
      setError('E-mail ou senha incorretos.');
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen w-full max-w-md mx-auto bg-deep-void overflow-hidden shadow-2xl justify-center px-6">
      <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[40%] bg-gradient-to-b from-aurora-blue/20 to-transparent blur-[80px] rounded-full pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col gap-10 animate-fade-in">
        <div className="text-center">
          <h1 className="text-[32px] font-black tracking-widest uppercase text-white mb-2">Acesso Triuno</h1>
          <p className="text-text-secondary text-xs font-black uppercase tracking-[0.3em] opacity-60">Retome sua Ascensão</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary pl-4">E-mail</label>
            <input 
              type="email" 
              required
              className="w-full glass-panel bg-white/5 px-6 h-14 rounded-2xl text-text-primary outline-none focus:ring-1 focus:ring-aurora-blue/50 transition-all"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Senha</label>
              <button 
                type="button" 
                onClick={onGoToForgotPassword}
                className="text-[9px] font-black uppercase tracking-widest text-aurora-orange/60 hover:text-aurora-orange transition-colors"
              >
                Esqueci minha senha
              </button>
            </div>
            <input 
              type="password" 
              required
              className="w-full glass-panel bg-white/5 px-6 h-14 rounded-2xl text-text-primary outline-none focus:ring-1 focus:ring-aurora-blue/50 transition-all"
              placeholder="••••••••"
              value={pass}
              onChange={e => setPass(e.target.value)}
            />
          </div>

          {error && (
            <div className="flex flex-col gap-2 bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
              <p className="text-red-400 text-[10px] font-black uppercase tracking-widest text-center animate-pulse">{error}</p>
              <div className="h-px bg-red-500/10 w-full my-1"></div>
              <p className="text-text-secondary text-[8px] font-bold uppercase tracking-widest text-center opacity-60">
                Tente:<br/>
                Admin: admin@triuno.com / admin123<br/>
                User: teste@triuno.com / 123456
              </p>
            </div>
          )}

          <button 
            type="submit"
            className="w-full h-14 bg-gradient-to-r from-aurora-blue to-aurora-purple text-white font-black text-xs tracking-[0.3em] rounded-2xl shadow-glow-blue uppercase active:scale-95 transition-all"
          >
            Entrar
          </button>
        </form>

        <div className="flex flex-col items-center gap-4">
          <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest opacity-40">Cadastre-se</p>
          <button 
            onClick={onGoToRegister}
            className="text-aurora-blue text-xs font-black uppercase tracking-widest hover:underline"
          >
            Criar Nova Conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
