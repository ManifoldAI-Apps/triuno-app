
import React, { useState } from 'react';

interface AdminWisdomProps {
  onBack: () => void;
  onSave: (text: string) => void;
}

const AdminWisdom: React.FC<AdminWisdomProps> = ({ onBack, onSave }) => {
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!text.trim()) return;
    setSaved(true);
    setTimeout(() => {
      onSave(text);
    }, 1500);
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-deep-void max-w-md mx-auto">
      <header className="sticky top-0 z-50 glass-panel !bg-deep-void/60 backdrop-blur-xl border-b border-white/5 p-6 md:px-12 pt-10 pb-4 flex items-center justify-between">
        <button onClick={onBack} className="flex size-10 items-center justify-center rounded-2xl glass-panel text-text-primary active:scale-90 transition-all border-white/10">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-xs font-black tracking-[0.3em] uppercase opacity-60">Mestre de Sabedoria</h2>
        <div className="size-10"></div>
      </header>

      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-2xl font-black text-text-primary tracking-tight mb-2 uppercase">Nova Sabedoria</h3>
          <p className="text-text-secondary text-xs font-medium uppercase tracking-widest">A frase que guiará os Guardiões hoje.</p>
        </div>
        
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-[32px] border-white/10 relative overflow-hidden">
            <textarea 
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-transparent border-none text-text-primary placeholder:text-white/20 text-lg font-serif italic focus:ring-0 min-h-[160px] resize-none p-0" 
              placeholder="Digite aqui a sabedoria que ecoará hoje..."
            ></textarea>
            {saved && (
              <div className="absolute inset-0 bg-aurora-blue/90 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in z-20">
                <span className="material-symbols-outlined text-white text-5xl mb-2 animate-bounce">check_circle</span>
                <p className="text-white font-black uppercase tracking-widest text-xs">Propagado!</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
             <button 
              onClick={handleSave}
              disabled={!text.trim() || saved}
              className="w-full h-16 bg-gradient-to-r from-aurora-blue to-aurora-purple text-white font-black text-xs tracking-[0.2em] rounded-3xl shadow-glow-blue uppercase active:scale-95 transition-all disabled:opacity-50"
            >
              Publicar no Éter
            </button>
            <p className="text-center text-[9px] font-black text-text-secondary uppercase tracking-[0.3em] opacity-40">Ação imediata e global</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWisdom;
