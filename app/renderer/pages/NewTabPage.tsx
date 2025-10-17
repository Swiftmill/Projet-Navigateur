import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { WidgetClock } from '../components/widgets/WidgetClock';
import { WidgetWeather } from '../components/widgets/WidgetWeather';
import { WidgetTodo } from '../components/widgets/WidgetTodo';
import { WidgetRss } from '../components/widgets/WidgetRss';
import videoAurora from '../assets/videos/aurora.mp4';
import videoCity from '../assets/videos/cyber-city.mp4';
import videoSunset from '../assets/videos/sunset-drive.mp4';

const favorites = [
  { label: 'ChatGPT', url: 'https://chat.openai.com' },
  { label: 'Twitch', url: 'https://twitch.tv' },
  { label: 'Discord', url: 'https://discord.com' },
  { label: 'YouTube', url: 'https://youtube.com' }
];

export function NewTabPage() {
  const playlist = useMemo(() => [videoAurora, videoCity, videoSunset], []);

  return (
    <div className="relative min-h-full overflow-hidden">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover opacity-70"
          src={playlist[0]}
          autoPlay
          muted
          loop
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/40 to-slate-900/80" />
        <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-40"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(139,92,246,0.3), transparent 60%)' }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-10 py-16">
        <header className="flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-5xl font-semibold text-white drop-shadow-lg"
          >
            Bienvenue dans HyperGX
          </motion.h1>
          <WidgetClock />
        </header>

        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-2 gap-4 rounded-3xl border border-slate-700/40 bg-slate-900/60 p-6 backdrop-blur-2xl">
              {favorites.map((favorite) => (
                <motion.a
                  key={favorite.url}
                  href={favorite.url}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="flex h-24 items-center justify-between rounded-2xl bg-slate-800/60 px-6 text-lg text-slate-100 shadow-lg"
                >
                  {favorite.label}
                  <span className="text-sm text-neon-500">→</span>
                </motion.a>
              ))}
            </div>
          </div>

          <div className="col-span-12 space-y-6 lg:col-span-4">
            <WidgetWeather city="Paris" />
            <WidgetTodo />
            <WidgetRss feedUrl="https://www.dealsdugamer.fr/rss" />
          </div>
        </section>
      </div>
    </div>
  );
}
