import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Article = {
  title: string;
  link: string;
  source: string;
};

export function GXCornerPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function fetchFeeds() {
      try {
        const response = await axios.get('/api/rss', {
          params: {
            feedUrl: 'https://www.jeuxvideo.com/rss/rss.xml'
          }
        });
        setArticles(response.data.items.slice(0, 6));
      } catch (error) {
        console.warn('Unable to load GX Corner feed', error);
      }
    }

    fetchFeeds();
  }, []);

  return (
    <div className="h-full overflow-y-auto p-10">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">GX Corner</h1>
        <p className="text-sm text-slate-400">Ajoutez vos flux favoris dans <code>app/renderer/pages/GXCornerPage.tsx</code>.</p>
      </header>
      <section className="mt-8 grid gap-6 md:grid-cols-3">
        {articles.map((article, index) => (
          <motion.a
            key={article.link}
            href={article.link}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="rounded-3xl border border-slate-700/60 bg-slate-900/60 p-6 text-slate-200 shadow-2xl"
          >
            <p className="text-xs uppercase text-neon-400">{article.source ?? 'Flux externe'}</p>
            <h2 className="mt-2 text-lg font-semibold text-white">{article.title}</h2>
            <p className="mt-4 text-xs text-slate-400">Carte #{index + 1} - animation Framer Motion</p>
          </motion.a>
        ))}
        {articles.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-700/60 bg-slate-900/40 p-6 text-slate-500">
            Aucun flux chargé. Vérifiez votre connexion ou ajoutez un proxy RSS dans <code>scripts/rss-proxy.ts</code>.
          </div>
        )}
      </section>
    </div>
  );
}
