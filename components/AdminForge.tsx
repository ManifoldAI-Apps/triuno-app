
import React, { useState } from 'react';
import { Task } from '../types';

interface AdminForgeProps {
  onBack: () => void;
  tasks: Task[];
  onUpdateTasks: (tasks: Task[]) => void;
}

const AdminForge: React.FC<AdminForgeProps> = ({ onBack, tasks, onUpdateTasks }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    category: 'Corpo' as Task['category'],
    xp: 20,
    icon: 'star',
    imageUrl: '',
    scheduledDate: new Date().toISOString().split('T')[0]
  });

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;
    const task: Task = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      category: newTask.category,
      xp: newTask.xp,
      completed: false,
      icon: newTask.icon,
      imageUrl: newTask.imageUrl,
      scheduledDate: newTask.scheduledDate
    };
    onUpdateTasks([...tasks, task]);
    setNewTask({ 
      title: '', 
      category: 'Corpo', 
      xp: 20, 
      icon: 'star', 
      imageUrl: '',
      scheduledDate: new Date().toISOString().split('T')[0] 
    });
  };

  const removeTask = (id: string) => {
    onUpdateTasks(tasks.filter(t => t.id !== id));
  };

  const COMMON_ICONS = ['water_drop', 'self_improvement', 'menu_book', 'bed', 'fitness_center', 'spa', 'bolt', 'eco', 'meditation', 'wb_sunny'];

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-deep-void">
      <header className="sticky top-0 z-50 glass-panel !bg-deep-void/60 backdrop-blur-xl border-b border-white/5 p-6 md:px-12 pt-8 pb-4 flex items-center justify-between">
        <button onClick={onBack} className="flex size-10 items-center justify-center rounded-2xl glass-panel text-text-primary active:scale-90 transition-all border-white/10">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <h2 className="text-xs font-black tracking-[0.3em] uppercase opacity-60">Forja de Missões</h2>
        <div className="size-10"></div>
      </header>

      <main className="flex-1 p-6 overflow-y-auto no-scrollbar pb-24 max-w-2xl mx-auto w-full">
        <section className="mb-10">
          <div className="glass-panel p-8 rounded-[36px] border-aurora-gold/20 bg-aurora-gold/5 mb-8">
            <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-aurora-gold">Forjar Nova Missão</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest pl-2">Título da Missão</label>
                <input 
                  className="w-full glass-panel bg-slate-900/50 px-5 h-14 rounded-2xl text-text-primary outline-none focus:ring-1 focus:ring-aurora-gold/50"
                  placeholder="Ex: Meditação Guiada"
                  value={newTask.title}
                  onChange={e => setNewTask(p => ({...p, title: e.target.value}))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest pl-2">Link da Imagem (Opcional)</label>
                <input 
                  className="w-full glass-panel bg-slate-900/50 px-5 h-14 rounded-2xl text-text-primary outline-none focus:ring-1 focus:ring-aurora-gold/50"
                  placeholder="https://imagem-do-habito.png"
                  value={newTask.imageUrl}
                  onChange={e => setNewTask(p => ({...p, imageUrl: e.target.value}))}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest pl-2">Vetor (Categoria)</label>
                  <select 
                    className="w-full glass-panel bg-slate-900 px-5 h-14 rounded-2xl text-text-primary outline-none focus:ring-1 focus:ring-aurora-gold/50 appearance-none"
                    value={newTask.category}
                    onChange={e => setNewTask(p => ({...p, category: e.target.value as any}))}
                  >
                    <option value="Corpo">Corpo</option>
                    <option value="Alma">Alma</option>
                    <option value="Espírito">Espírito</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest pl-2">Dia de Exibição</label>
                  <input 
                    type="date"
                    className="w-full glass-panel bg-slate-900 px-5 h-14 rounded-2xl text-text-primary outline-none focus:ring-1 focus:ring-aurora-gold/50 [color-scheme:dark]"
                    value={newTask.scheduledDate}
                    onChange={e => setNewTask(p => ({...p, scheduledDate: e.target.value}))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest pl-2">Recompensa (XP)</label>
                   <input 
                    type="number"
                    className="w-full glass-panel bg-slate-900 px-5 h-14 rounded-2xl text-aurora-gold font-bold outline-none"
                    value={newTask.xp}
                    onChange={e => setNewTask(p => ({...p, xp: parseInt(e.target.value) || 0}))}
                  />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest pl-2">Ícone Selecionado</label>
                   <div className="w-full glass-panel bg-slate-900 flex items-center justify-center h-14 rounded-2xl text-aurora-gold">
                      <span className="material-symbols-outlined">{newTask.icon}</span>
                   </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest pl-2">Seletor de Símbolo</label>
                <div className="grid grid-cols-5 gap-3">
                  {COMMON_ICONS.map(icon => (
                    <button 
                      key={icon}
                      onClick={() => setNewTask(p => ({...p, icon}))}
                      className={`size-12 rounded-xl flex items-center justify-center transition-all ${newTask.icon === icon ? 'bg-aurora-gold text-white shadow-glow-orange scale-110' : 'bg-white/5 text-text-secondary'}`}
                    >
                      <span className="material-symbols-outlined text-[20px]">{icon}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleAddTask}
                className="w-full h-16 bg-gradient-to-r from-aurora-gold to-orange-600 text-white font-black text-xs tracking-[0.3em] rounded-3xl shadow-glow-orange uppercase active:scale-95 transition-all mt-4"
              >
                Injetar Missão no Tempo
              </button>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="px-2 text-sm font-black tracking-[0.3em] text-text-secondary uppercase">Registro Temporal de Missões</h3>
          <div className="space-y-3">
            {[...tasks].sort((a,b) => b.scheduledDate.localeCompare(a.scheduledDate)).map(task => (
              <div key={task.id} className="glass-panel p-5 rounded-[28px] flex items-center justify-between group border-white/5">
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`size-12 rounded-2xl flex items-center justify-center border border-white/5 bg-white/5 shrink-0 ${task.category === 'Corpo' ? 'text-emerald-400' : task.category === 'Alma' ? 'text-aurora-orange' : 'text-aurora-blue'}`}>
                    {task.imageUrl ? (
                      <img src={task.imageUrl} className="w-full h-full object-cover rounded-2xl" alt="Task" />
                    ) : (
                      <span className="material-symbols-outlined">{task.icon}</span>
                    )}
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-bold text-text-primary tracking-wide uppercase truncate">{task.title}</p>
                    <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest mt-0.5 opacity-60">
                      {task.category} • {task.xp} XP • <span className="text-aurora-gold">{task.scheduledDate.split('-').reverse().join('/')}</span>
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => removeTask(task.id)}
                  className="size-10 rounded-full flex items-center justify-center text-red-400 hover:bg-red-400/10 active:scale-90 transition-all opacity-40 group-hover:opacity-100 shrink-0"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminForge;
