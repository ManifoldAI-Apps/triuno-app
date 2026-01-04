
import React from 'react';
import { View } from '../types';

interface NavbarProps {
  activeView: View;
  setView: (view: View) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, setView }) => {
  const navItems = [
    { view: View.DASHBOARD, label: 'Dia', icon: 'sunny' },
    { view: View.CALENDAR, label: 'Portal', icon: 'calendar_month' },
    { view: View.ACHIEVEMENTS, label: 'Troféus', icon: 'military_tech' },
    { view: View.RANKING, label: 'Líderes', icon: 'leaderboard' },
    { view: View.GRATITUDE, label: 'Rio', icon: 'favorite' },
    { view: View.JOURNEY, label: 'Perfil', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 z-[100] w-full glass-panel !rounded-none !rounded-t-[20px] !border-b-0 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-around pb-2 pt-2 px-2">
        {navItems.map(item => (
          <button 
            key={item.view}
            onClick={() => setView(item.view)}
            className="flex flex-col items-center gap-0.5 group cursor-pointer transition-all active:scale-90"
          >
            <div className={`flex items-center justify-center size-8 rounded-xl transition-all duration-300 ${activeView === item.view ? 'bg-aurora-blue/10 text-white shadow-glow-blue border border-aurora-blue/20' : 'text-text-secondary hover:bg-white/5'}`}>
              <span className={`material-symbols-outlined text-[18px] ${activeView === item.view ? 'drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]' : ''}`} style={{ fontVariationSettings: activeView === item.view ? "'FILL' 1" : "'FILL' 0" }}>
                {item.icon}
              </span>
            </div>
            <span className={`text-[7px] font-black uppercase tracking-[0.2em] transition-all ${activeView === item.view ? 'text-white' : 'text-text-secondary opacity-25'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
