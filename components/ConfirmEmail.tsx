
import React, { useState } from 'react';
import { User } from '../types';

interface ConfirmEmailProps {
  user: User;
  onVerify: (code: string) => boolean;
  onBack: () => void;
}

const ConfirmEmail: React.FC<ConfirmEmailProps> = ({ user, onVerify, onBack }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onVerify(code);
    if (!success) {
      setError('Código inválido ou expirado.');
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen w-full max-w-md mx-auto bg-deep-void overflow-hidden shadow-2xl justify-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1)_0%,transparent_70%)] pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col gap-10 animate-fade-in">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="size-20 rounded-full bg-aurora-blue/10 border border-aurora-blue/30 flex items-center justify-center mb-2">
            <span className="material-symbols-outlined text-aurora-blue text-4xl animate-pulse">mark_email_unread</span>
          </div>
          <h1 className="text-[28px] font-black tracking-widest uppercase text-white leading-tight">Verificação de Luz</h1>
          <p className="text-text-secondary text-sm font-medium leading-relaxed max-w-[80%] opacity-80">
            Enviamos um código sagrado para <span className="text-aurora-blue font-bold">{user.email}</span>. Digite-o para provar sua essência.
          </p>
        </div>

        <form onSubmit={handleVerify} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <input 
              type="text" 
              required
              maxLength={6}
              className="w-full glass-panel bg-white/5 px-6 h-16 rounded-2xl text-text-primary text-center text-2xl font-black tracking-[0.5em] outline-none focus:ring-2 focus:ring-aurora-blue/50 transition-all"
              placeholder="000000"
              value={code}
              onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
            />
            <p className="text-center text-[9px] font-black text-text-secondary uppercase tracking-widest opacity-40">Dica: Use o código 123456 (Simulado)</p>
          </div>

          {error && <p className="text-red-400 text-[10px] font-black uppercase tracking-widest text-center animate-pulse">{error}</p>}

          <button 
            type="submit"
            className="w-full h-14 bg-gradient-to-r from-aurora-blue to-emerald-500 text-white font-black text-xs tracking-[0.3em] rounded-2xl shadow-glow-blue uppercase active:scale-95 transition-all"
          >
            Verificar Código
          </button>
        </form>

        <div className="flex flex-col items-center gap-4">
          <button 
            className="text-text-secondary text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
          >
            Reenviar Código de Luz
          </button>
          <button 
            onClick={onBack}
            className="text-text-secondary/40 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
          >
            Voltar e Corrigir E-mail
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
