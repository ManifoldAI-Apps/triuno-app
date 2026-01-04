
import React, { useState } from 'react';

interface WelcomeProps {
  onNext: () => void;
  onAdminLogin: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onNext, onAdminLogin }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    const centerX = card.width / 2;
    const centerY = card.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="relative flex flex-col h-screen w-full max-w-md mx-auto bg-deep-void overflow-hidden shadow-2xl">
      <div className="absolute top-[-25%] left-[-20%] w-[140%] h-[70%] bg-gradient-to-b from-indigo-900/40 to-purple-900/30 blur-[90px] rounded-full pointer-events-none mix-blend-screen"></div>
      <div className="absolute top-[30%] right-[-30%] w-[100%] h-[60%] bg-purple-900/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen"></div>
      
      <div className="relative z-10 flex flex-col h-full px-6 py-8 justify-between">
        <div className="flex-none h-10"></div>
        
        <div 
          className="flex flex-col items-center justify-center flex-grow gap-12"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: '1000px' }}
        >
          <div 
            className="relative group transition-transform duration-200 ease-out"
            style={{ 
              transform: `rotateX(${rotate.x} text-[10px]deg) rotateY(${rotate.y}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="absolute -inset-10 bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-orange-400/5 rounded-full blur-3xl opacity-60 animate-pulse duration-[5000ms]"></div>
            
            {/* Camada de Profundidade Posterior */}
            <div 
              className="absolute inset-0 rounded-full border border-white/5 bg-white/2 backdrop-blur-sm"
              style={{ transform: 'translateZ(-20px)' }}
            ></div>

            <div className="relative flex items-center justify-center w-40 h-40 rounded-full border border-white/10 shadow-[0_0_30px_rgba(99,102,241,0.3)] bg-white/5 backdrop-blur-md ring-1 ring-white/5" style={{ transform: 'translateZ(20px)' }}>
              <div className="w-full h-full rounded-full p-6 flex items-center justify-center">
                <img 
                  alt="Triuno Logo" 
                  className="w-full h-full object-contain opacity-90 brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnFGplrlcLa3e7rjpCHPxOk_klXLcJUIoD27gvkuhiWNP-vhqanb3gwbTnZ08svXUfiQlXP0N6_8QhEMjJt1tHz1h0NH_0d0S0pphxcavfB0_JSWou4smeQQ9EgyXrt6R0OFW27iXpFQgYhx7ffirsqDA7txw4ajQjsOyUl_9cY-zJLgxxU-iAPjDC0yi3OjBzOHDXIqXd3jeWHNsemHugLvBe01yvECfi407iCvp-DFR3ga1Bj-iev-QCgL5GdlyD-n5R_hMnBqBx" 
                />
              </div>
            </div>

            {/* Brilho Dinâmico Superior */}
            <div 
              className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"
              style={{ transform: 'translateZ(40px)' }}
            ></div>
          </div>
          
          <div className="text-center space-y-6 max-w-[320px]" style={{ transform: 'translateZ(10px)' }}>
            <h1 className="text-[42px] font-bold text-text-primary leading-[1.1] drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] tracking-widest uppercase">
              Triuno
            </h1>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent mx-auto shadow-[0_0_8px_rgba(99,102,241,0.4)]"></div>
            <p className="text-text-secondary text-sm font-light uppercase tracking-[0.2em]">
              Sua Ascensão Diária
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 pb-8 w-full">
          <button 
            onClick={onNext}
            className="flex items-center justify-center w-full h-14 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-text-primary font-semibold text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-300 gap-4 group active:scale-[0.98] shadow-lg"
          >
            <span className="material-symbols-outlined text-aurora-blue">login</span>
            <span>Iniciar Ascensão</span>
          </button>
          
          <div className="flex items-center gap-4 py-3 opacity-40">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-slate-400/20 to-transparent"></div>
            <span className="text-[10px] font-bold text-slate-400/80 uppercase tracking-[0.2em]">Ecos</span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-slate-400/20 to-transparent"></div>
          </div>
          
          <button 
            onClick={onAdminLogin}
            className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary hover:text-aurora-blue transition-all py-2 duration-300 w-full"
          >
            Acesso para Administradores
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
