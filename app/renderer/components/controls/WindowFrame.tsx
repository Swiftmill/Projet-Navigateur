import { useEffect, useState } from 'react';

export function WindowFrame() {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMaximized(window.innerWidth >= screen.availWidth && window.innerHeight >= screen.availHeight);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="drag flex h-10 items-center justify-between border-b border-slate-800/60 bg-slate-950/80 px-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500">
        <span className="h-3 w-3 rounded-full bg-rose-500" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-emerald-500" />
        <span className="ml-4 text-slate-300">HyperGX Browser</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-400">
        {/* Les actions seront reliées à l'API preload (window management) */}
        <button className="no-drag rounded-full bg-slate-800/80 px-2 py-1">—</button>
        <button className="no-drag rounded-full bg-slate-800/80 px-2 py-1">{isMaximized ? '🗗' : '🗖'}</button>
        <button className="no-drag rounded-full bg-rose-500/80 px-2 py-1">✕</button>
      </div>
    </div>
  );
}
