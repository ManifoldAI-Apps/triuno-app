
import React, { useState } from 'react';

interface AddGratitudeProps {
  onBack: () => void;
  onAdd: (content: string, anonymous: boolean) => void;
}

const AddGratitude: React.FC<AddGratitudeProps> = ({ onBack, onAdd }) => {
  const [content, setContent] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  return (
    <div className="relative flex h-screen w-full flex-col bg-deep-void">
      <header className="flex items-center px-6 pt-12 pb-6 justify-between sticky top-0 z-50">
        <button onClick={onBack} className="text-text-primary/80 hover:text-white flex size-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h2 className="text-text-primary text-xs font-bold uppercase tracking-[0.15em] opacity-80">Portal de Ascensão</h2>
        <div className="size-10"></div>
      </header>

      <main className="flex-1 flex flex-col px-5 overflow-y-auto">
        <div className="mt-2 mb-8">
          <h1 className="text-text-primary tracking-wider text-3xl font-bold leading-tight">
            Adicionar<br/><span className="text-white">Gratidão</span>
          </h1>
        </div>

        <div className="glass-panel w-full p-6 shadow-xl flex flex-col gap-6 rounded-3xl">
          <div>
            <h2 className="text-text-primary text-lg font-semibold mb-2 tracking-wide">Pelo que você é grato hoje?</h2>
            <h3 className="text-text-secondary text-sm font-normal leading-relaxed">Compartilhe um momento de luz para iluminar o dia de alguém.</h3>
          </div>
          
          <div className="relative">
            <textarea 
              autoFocus
              className="w-full min-h-[180px] resize-none rounded-xl bg-text-primary border-0 text-slate-800 placeholder:text-slate-400 p-4 text-base focus:ring-2 focus:ring-aurora-blue/50 focus:outline-none transition-all"
              placeholder="Escreva aqui sua mensagem de luz..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-white/5 pt-4">
            <label className="flex items-center gap-3 cursor-pointer group select-none">
              <input 
                type="checkbox" 
                className="hidden" 
                checked={anonymous} 
                onChange={() => setAnonymous(!anonymous)}
              />
              <div className={`h-5 w-5 rounded border-2 transition-all flex items-center justify-center ${anonymous ? 'bg-aurora-blue border-aurora-blue' : 'border-text-secondary bg-transparent'}`}>
                {anonymous && <span className="material-symbols-outlined text-[16px] text-white">check</span>}
              </div>
              <span className="text-text-secondary text-sm font-medium">Anônimo</span>
            </label>
          </div>

          <button 
            onClick={() => content.trim() && onAdd(content, anonymous)}
            disabled={!content.trim()}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm tracking-widest uppercase shadow-glow-blue transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
            <span>LIBERAR BÊNÇÃO</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default AddGratitude;
