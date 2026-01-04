
import React, { useState } from 'react';

interface AdminNotificationsProps {
  onBack: () => void;
}

const AdminNotifications: React.FC<AdminNotificationsProps> = ({ onBack }) => {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-deep-void max-w-md mx-auto">
      <header className="sticky top-0 z-40 flex items-center bg-deep-void/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-text-primary hover:text-aurora-blue transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="text-text-primary text-lg font-bold tracking-wider">Central de Notificações</h2>
        </div>
        <button className="flex items-center justify-center rounded-full w-10 h-10 hover:bg-white/5 text-text-primary">
          <span className="material-symbols-outlined">history</span>
        </button>
      </header>

      <div className="flex-1 overflow-y-auto pb-12 p-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-500/20 p-2.5 rounded-2xl text-aurora-blue ring-1 ring-white/10">
            <span className="material-symbols-outlined text-xl">bolt</span>
          </div>
          <div>
            <h3 className="text-text-primary text-xl font-bold tracking-wider">Criar novo Pulso</h3>
            <p className="text-text-secondary text-sm">Configure e dispare notificações para os Guardiões.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-text-secondary text-[10px] font-bold uppercase tracking-widest pl-1">Título do Pulso</label>
            <input className="w-full glass-panel bg-transparent px-4 py-3.5 rounded-2xl text-base outline-none focus:ring-1 focus:ring-aurora-blue/50" placeholder="Ex: Bom dia, Guardião!" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-text-secondary text-[10px] font-bold uppercase tracking-widest pl-1">Mensagem</label>
            <textarea className="w-full glass-panel bg-transparent px-4 py-3.5 rounded-2xl text-base min-h-[140px] outline-none focus:ring-1 focus:ring-aurora-blue/50 resize-none" placeholder="Digite o corpo da notificação inspiradora..."></textarea>
          </div>

          <div className="space-y-3">
            <label className="text-text-secondary text-[10px] font-bold uppercase tracking-widest pl-1">Destinatário</label>
            <div className="grid grid-cols-3 gap-3">
              {['Todos', 'Inativos', 'Top 100'].map((dest, i) => (
                <button key={dest} className={`flex flex-col items-center justify-center p-3 rounded-2xl glass-panel transition-all ${i === 0 ? 'bg-aurora-blue/10 border-aurora-blue' : ''}`}>
                  <span className="material-symbols-outlined text-text-secondary mb-1">groups</span>
                  <span className="text-xs font-bold text-text-secondary">{dest}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 flex items-center gap-3">
          <button className="flex items-center justify-center w-14 h-14 rounded-2xl glass-panel text-text-secondary hover:text-white">
            <span className="material-symbols-outlined">visibility</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-700 text-white font-bold h-14 rounded-2xl shadow-glow-blue active:scale-95 transition-all">
            <span className="material-symbols-outlined">send</span>
            <span className="uppercase tracking-widest">DISPARAR PULSO</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;
