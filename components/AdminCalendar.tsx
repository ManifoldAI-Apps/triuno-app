
import React, { useState } from 'react';
import { AppEvent } from '../types';

interface AdminCalendarProps {
  onBack: () => void;
  onAdd: (event: AppEvent) => void;
}

const AdminCalendar: React.FC<AdminCalendarProps> = ({ onBack, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    type: 'LIVE' as 'LIVE' | 'EVENTO' | 'MENTORIA',
    link: '',
    imageUrl: '',
    xpReward: 100
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time) return;

    const newEvent: AppEvent = {
      id: `ev-${Date.now()}`,
      title: formData.title,
      date: new Date(formData.date).toISOString(),
      time: formData.time,
      type: formData.type,
      link: formData.link,
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
      xpReward: formData.xpReward
    };

    onAdd(newEvent);
  };

  const handleTypeChange = (type: 'LIVE' | 'EVENTO' | 'MENTORIA') => {
    const xpMap = { 'LIVE': 100, 'EVENTO': 50, 'MENTORIA': 150 };
    setFormData(p => ({ ...p, type, xpReward: xpMap[type] }));
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-deep-void max-w-md mx-auto">
      <header className="sticky top-0 z-50 glass-panel !bg-deep-void/60 backdrop-blur-xl border-b border-white/5 p-6 md:px-12 pt-10 pb-4 flex items-center justify-between">
        <button onClick={onBack} className="flex size-10 items-center justify-center rounded-2xl glass-panel text-text-primary active:scale-90 transition-all border-white/10">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <h2 className="text-xs font-black tracking-[0.3em] uppercase opacity-60">Forjar Portal</h2>
        <div className="size-10"></div>
      </header>

      <main className="flex-1 p-6 overflow-y-auto no-scrollbar pb-20">
        <div className="mb-8 p-6 glass-panel rounded-[32px] border-aurora-blue/20 bg-aurora-blue/5">
           <h3 className="text-text-primary text-xl font-black uppercase tracking-tight mb-2">Criar Evento</h3>
           <p className="text-text-secondary text-xs font-medium uppercase tracking-widest leading-relaxed">Sincronize todos os usuários com uma nova live ou encontro coletivo.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest pl-2">Título do Evento</label>
            <input 
              required
              className="w-full glass-panel bg-slate-900/50 px-5 h-14 rounded-2xl text-text-primary outline-none focus:ring-1 focus:ring-aurora-blue/50 transition-all"
              placeholder="Ex: Masterclass de Equilíbrio"
              value={formData.title}
              onChange={e => setFormData(p => ({...p, title: e.target.value}))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest pl-2">Data</label>
              <input 
                required
                type="date"
                className="w-full glass-panel bg-slate-900/50 px-5 h-14 rounded-2xl text-text-primary outline-none focus:ring-1 focus:ring-aurora-blue/50 [color-scheme:dark]"
                value={formData.date}
                onChange={e => setFormData(p => ({...p, date: e.target.value}))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest pl-2">Horário</label>
              <input 
                required
                type="time"
                className="w-full glass-panel bg-slate-900/50 px-5 h-14 rounded-2xl text-text-primary outline-none focus:ring-1 focus:ring-aurora-blue/50 [color-scheme:dark]"
                value={formData.time}
                onChange={e => setFormData(p => ({...p, time: e.target.value}))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest pl-2">Tipo de Portal</label>
            <div className="grid grid-cols-3 gap-3">
              {(['LIVE', 'EVENTO', 'MENTORIA'] as const).map(t => (
                <button 
                  key={t}
                  type="button"
                  onClick={() => handleTypeChange(t)}
                  className={`py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${formData.type === t ? 'bg-aurora-blue/20 border-aurora-blue text-white shadow-glow-blue' : 'glass-panel border-white/5 text-text-secondary'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest pl-2">Link (YouTube ou Externo)</label>
            <input 
              className="w-full glass-panel bg-slate-900/50 px-5 h-14 rounded-2xl text-text-primary outline-none focus:ring-1 focus:ring-aurora-blue/50 transition-all"
              placeholder="https://youtube.com/watch?v=..."
              value={formData.link}
              onChange={e => setFormData(p => ({...p, link: e.target.value}))}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest pl-2">Imagem de Capa (URL)</label>
            <input 
              className="w-full glass-panel bg-slate-900/50 px-5 h-14 rounded-2xl text-text-primary outline-none focus:ring-1 focus:ring-aurora-blue/50 transition-all"
              placeholder="https://images.unsplash.com/..."
              value={formData.imageUrl}
              onChange={e => setFormData(p => ({...p, imageUrl: e.target.value}))}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest pl-2">Recompensa (XP)</label>
            <div className="relative">
              <input 
                type="number"
                className="w-full glass-panel bg-slate-900/50 px-5 h-14 rounded-2xl text-aurora-gold font-bold outline-none focus:ring-1 focus:ring-aurora-gold/50 transition-all"
                value={formData.xpReward}
                onChange={e => setFormData(p => ({...p, xpReward: parseInt(e.target.value)}))}
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-aurora-gold text-[10px] font-black uppercase">Bolt XP</span>
            </div>
          </div>

          <div className="pt-6">
             <button 
              type="submit"
              className="w-full h-16 bg-gradient-to-r from-aurora-blue to-aurora-purple text-white font-black text-xs tracking-[0.3em] rounded-[28px] shadow-glow-blue uppercase active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined">auto_awesome</span>
              ATIVAR PORTAL TEMPORAL
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminCalendar;
