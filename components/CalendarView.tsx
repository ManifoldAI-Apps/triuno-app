
import React, { useState } from 'react';
import { View, AppEvent } from '../types';

interface CalendarViewProps {
  setView: (view: View) => void;
  events: AppEvent[];
  onAttend: (eventId: string) => void;
  attendedEvents: string[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ setView, events, onAttend, attendedEvents }) => {
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleEventClick = (event: AppEvent) => {
    setSelectedEvent(event);
    setIsSuccess(false);
  };

  const handleParticipate = (event: AppEvent) => {
    if (attendedEvents.includes(event.id)) return;
    setIsSuccess(true);
    onAttend(event.id);
    setTimeout(() => {
      if (event.link && !event.link.includes('youtube.com/embed')) {
        window.open(event.link, '_blank');
      }
    }, 1500);
  };

  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-deep-void overflow-x-hidden pt-safe pb-48">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.1)_0%,transparent_50%)] pointer-events-none z-0"></div>

      <header className="sticky top-0 z-50 glass-panel !bg-deep-void/60 backdrop-blur-xl border-b border-white/5 p-6 md:px-12 pt-8 pb-4 flex items-center justify-between">
        <button onClick={() => setView(View.DASHBOARD)} className="flex size-10 items-center justify-center rounded-2xl glass-panel text-white active:scale-90 transition-all border-white/10">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xs font-black tracking-[0.3em] uppercase opacity-60">Portal do Tempo</h1>
        <div className="size-10 rounded-2xl glass-panel flex items-center justify-center border border-white/10">
          <span className="material-symbols-outlined text-aurora-blue text-[20px]">calendar_today</span>
        </div>
      </header>

      <main className="relative z-10 w-full max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 gap-6">
          {sortedEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 opacity-30 text-center">
              <span className="material-symbols-outlined text-6xl mb-6">event_busy</span>
              <p className="text-xs font-black uppercase tracking-[0.25em] leading-relaxed">O éter está silencioso.<br/>Novos portais abrirão em breve.</p>
            </div>
          ) : (
            sortedEvents.map((event, idx) => {
              const isAttended = attendedEvents.includes(event.id);
              const eventDate = new Date(event.date);
              const formattedDate = eventDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });

              return (
                <div 
                  key={event.id}
                  onClick={() => handleEventClick(event)}
                  className={`group relative glass-panel rounded-[32px] overflow-hidden border-white/5 hover:border-aurora-blue/30 transition-all cursor-pointer animate-slide-up shadow-xl ${isAttended ? 'opacity-80' : ''}`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-48 aspect-video md:aspect-square shrink-0">
                      {event.imageUrl ? (
                        <img src={event.imageUrl} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700" alt={event.title} />
                      ) : (
                        <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                           <span className="material-symbols-outlined text-4xl opacity-10">image</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4 glass-panel px-4 py-1.5 rounded-xl border-white/10 backdrop-blur-md shadow-lg">
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">{event.type}</span>
                      </div>
                    </div>

                    <div className="flex-1 p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                           <span className="text-aurora-gold text-[10px] font-black uppercase tracking-[0.25em]">{formattedDate} • {event.time}</span>
                           {isAttended && (
                             <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase px-2.5 py-1 rounded-full border border-emerald-500/30 tracking-widest">REGISTRADO</span>
                           )}
                        </div>
                        <h2 className="text-xl font-black text-text-primary leading-tight mb-4 group-hover:text-aurora-blue transition-colors uppercase tracking-wide">
                          {event.title}
                        </h2>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2">
                           <div className="size-8 rounded-xl bg-aurora-gold/10 flex items-center justify-center border border-aurora-gold/10">
                              <span className="material-symbols-outlined text-aurora-gold text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                           </div>
                           <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">+{event.xpReward} XP</span>
                        </div>
                        <span className="material-symbols-outlined text-text-secondary group-hover:translate-x-1 transition-transform group-hover:text-white">{isAttended ? 'task_alt' : 'arrow_forward'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      {selectedEvent && (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-6 animate-fade-in">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" onClick={() => setSelectedEvent(null)}></div>
          <div className="relative w-full max-w-2xl bg-slate-900 md:rounded-[48px] rounded-t-[48px] border-t md:border border-white/10 shadow-3xl overflow-hidden flex flex-col max-h-[92dvh] animate-slide-up">
            <div className="relative w-full aspect-video overflow-hidden">
              <img src={selectedEvent.imageUrl} className="w-full h-full object-cover" alt={selectedEvent.title} />
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-6 right-6 size-12 glass-panel !rounded-2xl flex items-center justify-center text-white active:scale-90 transition-all border-white/20 z-20 shadow-xl"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent"></div>
              <div className="absolute bottom-8 left-8 flex gap-3">
                 <span className="bg-aurora-blue text-white text-[10px] font-black uppercase px-5 py-2.5 rounded-2xl tracking-[0.2em] shadow-2xl border border-white/10">{selectedEvent.type}</span>
              </div>
            </div>

            <div className="p-8 md:p-10 flex flex-col gap-8 overflow-y-auto no-scrollbar">
              <div className="flex items-center gap-4">
                 <div className="glass-panel p-4 rounded-[24px] border-white/10 text-center min-w-[85px] shadow-lg">
                    <p className="text-[10px] font-black text-text-secondary uppercase mb-1 tracking-widest">Data</p>
                    <p className="text-sm font-black text-text-primary uppercase tracking-widest">{new Date(selectedEvent.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</p>
                 </div>
                 <div className="glass-panel p-4 rounded-[24px] border-white/10 text-center min-w-[85px] shadow-lg">
                    <p className="text-[10px] font-black text-text-secondary uppercase mb-1 tracking-widest">Horário</p>
                    <p className="text-sm font-black text-text-primary tracking-widest">{selectedEvent.time}</p>
                 </div>
                 <div className="glass-panel p-4 rounded-[24px] border-aurora-gold/30 text-center min-w-[85px] bg-aurora-gold/10 shadow-lg">
                    <p className="text-[10px] font-black text-aurora-gold uppercase mb-1 tracking-widest">Bônus</p>
                    <p className="text-sm font-black text-aurora-gold tracking-widest">+{selectedEvent.xpReward} XP</p>
                 </div>
              </div>

              <div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 leading-none">{selectedEvent.title}</h2>
                <p className="text-text-secondary text-base leading-relaxed font-serif italic opacity-70">
                  Sua presença em {selectedEvent.type.toLowerCase()}s é um marco na sua ascensão. Ao clicar em acessar, sua presença será eternizada e sua recompensa concedida.
                </p>
              </div>

              {selectedEvent.link && (selectedEvent.link.includes('youtube.com') || selectedEvent.link.includes('youtu.be')) && (
                <div className="rounded-[32px] overflow-hidden border-2 border-white/10 aspect-video bg-black/80 shadow-3xl">
                   <iframe 
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${selectedEvent.link.includes('v=') ? selectedEvent.link.split('v=')[1].split('&')[0] : selectedEvent.link.split('/').pop()}`}
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                   ></iframe>
                </div>
              )}

              <div className="pt-2 pb-6">
                 <button 
                  onClick={() => handleParticipate(selectedEvent)}
                  disabled={attendedEvents.includes(selectedEvent.id) || isSuccess}
                  className={`w-full py-6 rounded-[32px] flex items-center justify-center gap-4 transition-all active:scale-95 shadow-3xl relative overflow-hidden border-2 border-white/10 ${
                    attendedEvents.includes(selectedEvent.id) 
                    ? 'bg-slate-800 text-text-secondary cursor-default opacity-50' 
                    : isSuccess 
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gradient-to-r from-aurora-blue to-aurora-purple text-white shadow-glow-blue'
                  }`}
                 >
                   <span className="material-symbols-outlined text-2xl relative z-10">
                    {attendedEvents.includes(selectedEvent.id) ? 'verified' : isSuccess ? 'celebration' : 'bolt'}
                   </span>
                   <span className="text-xs font-black uppercase tracking-[0.4em] relative z-10">
                    {attendedEvents.includes(selectedEvent.id) ? 'PRESENÇA JÁ REGISTRADA' : isSuccess ? 'XP CONCEDIDO!' : 'ACESSAR E COLETAR XP'}
                   </span>
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
