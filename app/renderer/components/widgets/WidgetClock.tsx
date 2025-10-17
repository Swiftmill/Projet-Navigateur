import { useEffect, useState } from 'react';

export function WidgetClock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-3xl border border-slate-700/40 bg-slate-900/60 px-6 py-4 text-right shadow-xl backdrop-blur-xl">
      <p className="text-4xl font-semibold text-white">{time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
      <p className="text-xs uppercase tracking-widest text-slate-400">
        {time.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
      </p>
    </div>
  );
}
