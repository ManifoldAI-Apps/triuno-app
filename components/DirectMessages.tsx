
import React, { useState, useEffect, useRef } from 'react';
import { User, ChatMessage } from '../types';

interface DirectMessagesProps {
  user: User;
  initialContactId: string | null;
  registeredUsers: User[];
  messages: ChatMessage[];
  onSendMessage: (receiverId: string, text: string) => void;
  onBack: () => void;
}

const DirectMessages: React.FC<DirectMessagesProps> = ({ user, initialContactId, registeredUsers, messages, onSendMessage, onBack }) => {
  const [activeContactId, setActiveContactId] = useState<string | null>(initialContactId);
  const [activeTab, setActiveTab] = useState<'CHATS' | 'CONEXOES'>('CHATS');
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeContactId]);

  const activeContact = registeredUsers.find(u => u.id === activeContactId);
  const isConnected = (user.connections || []).includes(activeContactId || '');
  
  const filteredMessages = messages.filter(m => 
    (m.senderId === user.id && m.receiverId === activeContactId) ||
    (m.senderId === activeContactId && m.receiverId === user.id)
  );

  const chatContactsIds = Array.from(new Set(messages
    .filter(m => m.senderId === user.id || m.receiverId === user.id)
    .map(m => m.senderId === user.id ? m.receiverId : m.senderId)));
  
  const chatContacts = registeredUsers.filter(u => chatContactsIds.includes(u.id));
  const connectedUsers = registeredUsers.filter(u => (user.connections || []).includes(u.id));

  const handleSend = () => {
    if (inputText.trim() && activeContactId && isConnected) {
      onSendMessage(activeContactId, inputText);
      setInputText('');
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-deep-void max-w-md mx-auto overflow-hidden">
      {!activeContactId ? (
        <>
          <header className="sticky top-0 z-50 glass-panel !bg-deep-void/60 backdrop-blur-xl border-b border-white/5 p-6 md:px-12 pt-8 pb-4 flex flex-col gap-6 shrink-0">
            <div className="flex items-center justify-between">
              <button onClick={onBack} className="size-10 flex items-center justify-center rounded-2xl glass-panel text-white active:scale-90 transition-all border-white/10">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <h1 className="text-xs font-black tracking-[0.3em] uppercase opacity-60">Eco de Mensagens</h1>
              <div className="size-10"></div>
            </div>
            
            <div className="flex glass-panel rounded-2xl p-1 bg-white/5">
              <button 
                onClick={() => setActiveTab('CHATS')}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'CHATS' ? 'bg-aurora-blue text-white shadow-glow-blue' : 'text-text-secondary hover:text-white'}`}
              >
                Ativas
              </button>
              <button 
                onClick={() => setActiveTab('CONEXOES')}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'CONEXOES' ? 'bg-aurora-blue text-white shadow-glow-blue' : 'text-text-secondary hover:text-white'}`}
              >
                Sincronias
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar pb-32">
            {activeTab === 'CHATS' ? (
              chatContacts.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center opacity-30 text-center px-10">
                  <span className="material-symbols-outlined text-5xl mb-4">forum</span>
                  <p className="text-xs font-black uppercase tracking-widest leading-relaxed">Nenhum eco ativo.</p>
                </div>
              ) : (
                chatContacts.map(c => (
                  <button 
                    key={c.id} 
                    onClick={() => setActiveContactId(c.id)}
                    className="w-full flex items-center gap-4 p-4 glass-panel rounded-3xl border-white/5 hover:bg-white/5 transition-all text-left"
                  >
                    <img src={c.avatar} className="size-12 rounded-2xl object-cover border border-white/10" alt={c.name} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black uppercase tracking-wide text-white truncate">{c.name}</p>
                      <p className="text-[10px] text-text-secondary truncate opacity-60">Retomar sincronia...</p>
                    </div>
                  </button>
                ))
              )
            ) : (
              connectedUsers.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center opacity-30 text-center px-10">
                  <span className="material-symbols-outlined text-5xl mb-4">sync</span>
                  <p className="text-xs font-black uppercase tracking-widest leading-relaxed">Nenhuma alma sincronizada.</p>
                </div>
              ) : (
                connectedUsers.map(c => (
                  <button 
                    key={c.id} 
                    onClick={() => setActiveContactId(c.id)}
                    className="w-full flex items-center gap-4 p-4 glass-panel rounded-3xl border-white/5 hover:bg-white/5 transition-all text-left group"
                  >
                    <img src={c.avatar} className="size-12 rounded-2xl object-cover border border-white/10" alt={c.name} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black uppercase tracking-wide text-white truncate">{c.name}</p>
                      <p className="text-[10px] text-aurora-blue font-black uppercase tracking-widest">Nível {c.level}</p>
                    </div>
                  </button>
                ))
              )
            )}
          </main>
        </>
      ) : (
        <div className="flex flex-col h-full bg-slate-900 animate-fade-in relative">
          <header className="sticky top-0 z-50 glass-panel !bg-deep-void/60 backdrop-blur-xl border-b border-white/5 p-4 pt-12 flex items-center gap-4 shrink-0">
            <button onClick={() => setActiveContactId(null)} className="size-10 flex items-center justify-center rounded-2xl glass-panel text-white active:scale-90 transition-all border-white/10">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="flex items-center gap-3">
              <img src={activeContact?.avatar} className="size-10 rounded-xl object-cover border border-white/10" alt={activeContact?.name} />
              <div className="flex flex-col min-w-0">
                <p className="text-xs font-black uppercase tracking-widest text-white truncate">{activeContact?.name}</p>
                <div className="flex items-center gap-1">
                   <span className={`size-1.5 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-aurora-gold animate-pulse'}`}></span>
                   <p className={`text-[8px] font-bold uppercase tracking-widest ${isConnected ? 'text-emerald-400' : 'text-aurora-gold'}`}>
                    {isConnected ? 'Sincronizado' : 'Aguardando Sincronia'}
                   </p>
                </div>
              </div>
            </div>
          </header>

          <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
            {filteredMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-20 text-center gap-4 py-20">
                 <span className="material-symbols-outlined text-4xl">auto_awesome</span>
                 <p className="text-[10px] font-black uppercase tracking-widest">Inicie um eco de luz...</p>
              </div>
            ) : filteredMessages.map(m => {
              const isMine = m.senderId === user.id;
              return (
                <div key={m.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] px-4 py-3 rounded-3xl shadow-lg relative ${
                    isMine 
                    ? 'bg-aurora-blue/20 text-white rounded-br-none border border-aurora-blue/20' 
                    : 'bg-white/10 text-text-primary rounded-bl-none border border-white/10'
                  }`}>
                    <p className="text-[13px] leading-relaxed">{m.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1 opacity-40">
                      <p className="text-[8px] font-black uppercase tracking-tighter">{m.timestamp}</p>
                      {isMine && <span className="material-symbols-outlined text-[12px]">done_all</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </main>

          <footer className="p-4 pb-[86px] bg-deep-void/95 backdrop-blur-md shrink-0 border-t border-white/5 z-40">
            {!isConnected ? (
              <div className="bg-aurora-gold/10 border border-aurora-gold/20 p-3 rounded-2xl text-center">
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-aurora-gold">Aguardando aceite de sincronia...</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <input 
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSend()}
                    className="w-full h-12 bg-white/5 border border-white/10 px-5 rounded-3xl text-sm outline-none focus:border-aurora-blue/50 transition-all text-white placeholder:text-white/20"
                    placeholder="Ecoar palavra..."
                  />
                </div>
                <button 
                  onClick={handleSend} 
                  disabled={!inputText.trim()}
                  className="size-12 rounded-full bg-aurora-blue text-white shadow-glow-blue flex items-center justify-center active:scale-90 transition-all disabled:opacity-30"
                >
                  <span className="material-symbols-outlined text-xl">send</span>
                </button>
              </div>
            )}
          </footer>
        </div>
      )}
    </div>
  );
};

export default DirectMessages;
