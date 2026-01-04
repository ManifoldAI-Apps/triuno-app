
import React, { useState } from 'react';
import { View, GratitudePost } from '../types';

interface GratitudeProps {
  setView: (view: View) => void;
  posts: GratitudePost[];
  onLike: (postId: string) => void;
  onComment: (postId: string, text: string) => void;
  likedPosts: string[];
  onUserClick: (id: string) => void;
}

const Gratitude: React.FC<GratitudeProps> = ({ setView, posts, onLike, onComment, likedPosts, onUserClick }) => {
  const [expandedComments, setExpandedComments] = useState<string[]>([]);
  const [commentInputs, setCommentInputs] = useState<{[key: string]: string}>({});
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const toggleComments = (postId: string) => {
    setExpandedComments(prev => 
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const handleInputChange = (postId: string, value: string) => {
    setCommentInputs(prev => ({ ...prev, [postId]: value }));
  };

  const submitComment = (postId: string) => {
    const text = commentInputs[postId];
    if (text && text.trim()) {
      onComment(postId, text);
      setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-deep-void overflow-x-hidden pt-safe pb-48">
      <div className="fixed top-0 left-0 right-0 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.1)_0%,transparent_70%)] pointer-events-none z-0"></div>
      
      <header className="sticky top-0 z-50 glass-panel !bg-deep-void/60 backdrop-blur-xl border-b border-white/5 p-6 md:px-12 pt-8 pb-4 flex items-center justify-between">
        <button onClick={() => setView(View.DASHBOARD)} className="size-10 flex items-center justify-center rounded-2xl glass-panel text-white active:scale-90 transition-all border-white/10">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xs font-black tracking-[0.3em] uppercase opacity-60">Rio de Luz</h1>
        <div className="size-10"></div>
      </header>

      <main className="flex-1 w-full max-w-2xl mx-auto pt-8 px-6 overflow-y-auto no-scrollbar z-10">
        <div className="mb-12 text-center animate-fade-in px-4">
          <p className="text-aurora-blue text-[10px] font-black tracking-[0.3em] uppercase mb-4 opacity-70">Conexão Coletiva</p>
          <p className="text-2xl italic text-text-primary font-serif font-light drop-shadow-lg leading-relaxed">
            "A gratidão é a memória do coração."
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {currentPosts.map((post, idx) => {
            const isLiked = likedPosts.includes(post.id);
            const isExpanded = expandedComments.includes(post.id);
            const commentCount = post.comments?.length || 0;

            return (
              <div key={post.id} className="glass-panel p-6 flex flex-col gap-4 rounded-[32px] animate-slide-up border-white/5 shadow-2xl" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="flex items-center justify-between">
                  <div 
                    className="flex items-center gap-3 cursor-pointer group/author"
                    onClick={() => post.authorId && onUserClick(post.authorId)}
                  >
                    <div className="size-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/author:border-aurora-gold transition-colors shadow-inner">
                      <span className="material-symbols-outlined text-aurora-gold text-lg">{post.icon}</span>
                    </div>
                    <span className="text-xs font-black tracking-widest uppercase text-text-secondary group-hover/author:text-white transition-colors">{post.author}</span>
                  </div>
                  <div className="text-[10px] font-black text-aurora-blue tracking-[0.2em] bg-aurora-blue/10 px-3 py-1.5 rounded-full uppercase border border-aurora-blue/10">
                    {post.type}
                  </div>
                </div>
                
                {post.imageUrl && (
                  <div className="relative group overflow-hidden rounded-[24px]">
                    <a 
                      href={post.imageUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full aspect-video rounded-[24px] overflow-hidden border border-white/5 shadow-inner block transition-transform active:scale-[0.98]"
                      title="Ver em tamanho real"
                    >
                      <img src={post.imageUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" alt="Moment of gratitude" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 pointer-events-none backdrop-blur-[2px]">
                        <span className="material-symbols-outlined text-white text-3xl animate-pulse">open_in_new</span>
                      </div>
                    </a>
                  </div>
                )}

                <p className="text-text-primary text-lg leading-relaxed font-serif italic text-center px-4 py-2">
                  "{post.content}"
                </p>

                <div className="flex items-center justify-center gap-4 pt-2">
                  <button 
                    onClick={() => onLike(post.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all active:scale-90 group ${isLiked ? 'bg-aurora-orange/20 border-aurora-orange/40 shadow-glow-orange text-white' : 'bg-white/5 border-white/10 hover:bg-white/10 text-text-secondary'}`}
                  >
                    <span 
                      className={`material-symbols-outlined transition-colors ${isLiked ? 'text-aurora-orange' : 'group-hover:text-aurora-orange'}`} 
                      style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-widest">
                      {post.likes}
                    </span>
                  </button>

                  <button 
                    onClick={() => toggleComments(post.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all active:scale-90 group ${isExpanded ? 'bg-aurora-blue/20 border-aurora-blue/40 text-white' : 'bg-white/5 border-white/10 hover:bg-white/10 text-text-secondary'}`}
                  >
                    <span className={`material-symbols-outlined transition-colors ${isExpanded ? 'text-aurora-blue' : 'group-hover:text-aurora-blue'}`}>
                      chat_bubble
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-widest">
                      {commentCount}
                    </span>
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-6 border-t border-white/5 space-y-4 animate-fade-in">
                    <div className="max-h-52 overflow-y-auto no-scrollbar space-y-4 pr-1">
                      {post.comments && post.comments.length > 0 ? (
                        post.comments.map((comment) => (
                          <div key={comment.id} className="flex flex-col gap-2 px-4 py-3 bg-white/[0.03] rounded-[20px] border border-white/5 shadow-inner">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-black text-aurora-blue uppercase tracking-widest">{comment.author}</span>
                              <span className="text-[9px] font-black text-text-secondary opacity-30 uppercase tracking-widest">{comment.time}</span>
                            </div>
                            <p className="text-xs text-text-primary italic font-serif leading-relaxed px-1">
                              {comment.text}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-[10px] text-center text-text-secondary uppercase tracking-[0.2em] py-4 opacity-50">Silêncio de luz. Seja o primeiro a falar.</p>
                      )}
                    </div>

                    <div className="relative flex items-center gap-2 pt-2">
                      <input 
                        type="text"
                        placeholder="Ecoar uma palavra..."
                        value={commentInputs[post.id] || ''}
                        onChange={(e) => handleInputChange(post.id, e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && submitComment(post.id)}
                        className="flex-1 h-12 bg-white/5 border border-white/10 rounded-2xl px-5 text-xs text-text-primary placeholder:text-text-secondary/40 outline-none focus:border-aurora-blue/40 transition-all shadow-inner"
                      />
                      <button 
                        onClick={() => submitComment(post.id)}
                        className="size-12 shrink-0 flex items-center justify-center rounded-2xl bg-aurora-blue/20 border border-aurora-blue/40 text-aurora-blue active:scale-90 transition-all shadow-lg"
                      >
                        <span className="material-symbols-outlined text-lg">send</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between py-10 mt-6 border-t border-white/5">
            <button 
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-secondary disabled:opacity-20 transition-all hover:text-white"
            >
              <span className="material-symbols-outlined">chevron_left</span>
              Anterior
            </button>
            <span className="text-[10px] font-black text-aurora-blue uppercase tracking-[0.2em]">Página {currentPage} de {totalPages}</span>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-secondary disabled:opacity-20 transition-all hover:text-white"
            >
              Próxima
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        )}

        {posts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 opacity-30">
             <span className="material-symbols-outlined text-6xl mb-4 animate-pulse">waves</span>
             <p className="text-sm font-black uppercase tracking-[0.2em]">O rio está calmo.</p>
          </div>
        )}
      </main>

      <div className="fixed bottom-32 left-0 right-0 z-40 flex justify-center px-6 pointer-events-none">
        <button 
          onClick={() => setView(View.ADD_GRATITUDE)}
          className="w-full max-w-xs bg-gradient-to-r from-aurora-gold via-orange-500 to-aurora-orange text-white text-[11px] font-black tracking-[0.3em] py-5 rounded-[24px] flex items-center justify-center gap-3 shadow-[0_15px_35px_rgba(249,115,22,0.5)] active:scale-95 transition-all uppercase pointer-events-auto border-2 border-white/20"
        >
          <span className="material-symbols-outlined text-xl">auto_awesome</span>
          Forjar Gratidão
        </button>
      </div>
    </div>
  );
};

export default Gratitude;
