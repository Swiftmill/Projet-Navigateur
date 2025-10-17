import { useState } from 'react';

export function WidgetTodo() {
  const [tasks, setTasks] = useState<string[]>(['Terminer la mise à jour du thème', 'Réviser les extensions installées']);
  const [value, setValue] = useState('');

  return (
    <div className="rounded-3xl border border-slate-700/40 bg-slate-900/60 p-5 text-slate-100 shadow-xl backdrop-blur-xl">
      <p className="text-xs uppercase tracking-widest text-slate-400">To-do</p>
      <ul className="mt-3 space-y-2 text-sm text-slate-300">
        {tasks.map((task) => (
          <li key={task} className="flex items-center gap-2">
            <span className="inline-flex h-3 w-3 rounded-full bg-neon-600/80" />
            <span>{task}</span>
          </li>
        ))}
      </ul>
      <form
        className="mt-4 flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          if (!value.trim()) {
            return;
          }
          setTasks((current) => [...current, value.trim()]);
          setValue('');
        }}
      >
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Ajouter une tâche"
          className="flex-1 rounded-full bg-slate-950/70 px-3 py-2 text-xs text-slate-200 outline-none placeholder:text-slate-500"
        />
        <button className="rounded-full bg-neon-600/70 px-3 py-2 text-xs text-white">+</button>
      </form>
    </div>
  );
}
