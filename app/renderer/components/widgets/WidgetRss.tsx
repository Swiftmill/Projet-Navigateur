import { useEffect, useState } from 'react';
import axios from 'axios';

export type RssItem = {
  title: string;
  link: string;
};

export function WidgetRss({ feedUrl }: { feedUrl: string }) {
  const [items, setItems] = useState<RssItem[]>([]);

  useEffect(() => {
    async function fetchRss() {
      try {
        const response = await axios.get('/api/rss', { params: { feedUrl } });
        setItems(response.data.items);
      } catch (error) {
        console.warn('RSS feed unavailable', error);
      }
    }
    fetchRss();
  }, [feedUrl]);

  return (
    <div className="rounded-3xl border border-slate-700/40 bg-slate-900/60 p-5 text-slate-100 shadow-xl backdrop-blur-xl">
      <p className="text-xs uppercase tracking-widest text-slate-400">Deals & Gaming</p>
      <ul className="mt-3 space-y-2 text-xs text-slate-300">
        {items.slice(0, 4).map((item) => (
          <li key={item.link}>
            <a className="hover:text-neon-400" href={item.link}>
              {item.title}
            </a>
          </li>
        ))}
        {items.length === 0 && <li className="text-slate-500">Ajoutez un proxy RSS dans les scripts.</li>}
      </ul>
    </div>
  );
}
