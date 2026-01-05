
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface RegisterProps {
  onGoToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onGoToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Criar usuário na Auth Store (Supabase Auth)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: pass,
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Criar perfil público na tabela 'users'
        const newUserProfile = {
          id: authData.user.id, // O ID agora é o UUID do Auth
          name,
          email,
          level: 1,
          xp: 0,
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB74Y8ceZgGcCwCi8BYI81Q8BeMUPMo5zFjWEzWO3KFqMv8hy1md0VNoDEsiVaLDdanFbGDLv_k6GjQdGiGGIfMT02LGBId6qOIxQ4RtcHcB0E6xynPoHVkJj2IM77-MJKf6mE4xM74apHAs4WcONmunxVdbe40T82qlnTw3ZIJbfaS0VOjY6QsWzRRH3kvFRhHW_fTPIQdtRH1C04fBAj-LNcFsk2yNHmGSIQoBJ6GtAmP9P8sNutwBOG-4eCPcKGVn0yYV2_pMysH',
          status: 'Ativo',
          role: 'User',
          bio: 'Buscador da Ascensão.',
          connections: [],
          pendingRequests: [],
          sentRequests: [],
          hasAcceptedCommitment: false,
          isVerified: false
        };

        const { error: dbError } = await supabase.from('users').insert(newUserProfile);

        if (dbError) throw dbError;

        // Sucesso!
        // O App.tsx vai detectar o login automaticamente pelo onAuthStateChange? 
        // Se o Supabase fizer auto-login após registro (padrão se email confirm desligado), sim.
        // Se precisar confirmar email, avisar.
        if (authData.session) {
          // Usuário já logado
        } else {
          alert("Verifique seu e-mail para confirmar o cadastro!");
          onGoToLogin();
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary pl-4">Senha</label>
            <input
              type="password"
              required
              className="w-full glass-panel bg-white/5 px-6 h-14 rounded-2xl text-text-primary outline-none focus:ring-1 focus:ring-aurora-purple/50 transition-all"
              placeholder="Mínimo 6 caracteres"
              value={pass}
              onChange={e => setPass(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && <p className="text-red-400 text-[10px] font-black uppercase tracking-widest text-center animate-pulse">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-gradient-to-r from-aurora-purple to-aurora-blue text-white font-black text-xs tracking-[0.3em] rounded-2xl shadow-glow-blue uppercase active:scale-95 transition-all mt-4 disabled:opacity-50"
          >
            {loading ? 'Criando...' : 'Criar Conta'}
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
