
import React, { useState } from 'react';

interface ForgotPasswordProps {
  onBack: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSent(true);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen w-full max-w-md mx-auto bg-deep-void overflow-hidden shadow-2xl justify-center px-6">
      <div className="absolute top-[-10%] right-[-10%] w-[120%] h-[40%] bg-gradient-to-b from-aurora-orange/20 to-transparent blur-[80px] rounded-full pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col gap-10 animate-fade-in">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="size-20 rounded-full bg-aurora-orange/10 border border-aurora-orange/30 flex items-center justify-center mb-2">
            <span className="material-symbols-outlined text-aurora-orange text-4xl">key</span>
          </div>
          <h1 className="text-[28px] font-black tracking-widest uppercase text-white leading-tight">Resgatar Essência</h1>
          <p className="text-text-secondary text-sm font-medium leading-relaxed max-w-[85%] opacity-80">
            {sent 
              ? `Um link sagrado de redefinição foi enviado para ${email}. Verifique seu éter (e-mail).` 
              : "Informe seu e-mail de registro para receber as instruções de recuperação de acesso."
            }
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary pl-4">E-mail de Registro</label>
              <input 
                type="email" 
                required
                className="w-full glass-panel bg-white/5 px-6 h-14 rounded-2xl text-text-primary outline-none focus:ring-1 focus:ring-aurora-orange/50 transition-all"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-aurora-orange to-red-600 text-white font-black text-xs tracking-[0.3em] rounded-2xl shadow-glow-orange uppercase active:scale-95 transition-all"
            >
              Enviar Link de Redefinição
            </button>
          </form>
        ) : (
          <div className="p-6 rounded-[32px] bg-emerald-500/10 border border-emerald-500/20 text-center animate-bounce">
            <p className="text-emerald-400 text-xs font-black uppercase tracking-widest">Sucesso! Caminho liberado.</p>
          </div>
        )}

        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-text-secondary/60 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Voltar ao Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
