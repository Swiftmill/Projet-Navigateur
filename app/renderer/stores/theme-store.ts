import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeDefinition = {
  name: string;
  colors: {
    primaryHue: number;
    accentHue: number;
    backgroundLightness: number;
  };
};

type ThemeStore = {
  currentTheme: ThemeDefinition;
  updateColor: (key: keyof ThemeDefinition['colors'], value: number) => void;
  applyPreset: (preset: 'neon' | 'midnight' | 'sunset') => void;
  exportTheme: () => void;
  importTheme: (json: string) => void;
};

const presets: Record<'neon' | 'midnight' | 'sunset', ThemeDefinition> = {
  neon: {
    name: 'Neon Pulse',
    colors: { primaryHue: 270, accentHue: 200, backgroundLightness: 12 }
  },
  midnight: {
    name: 'Midnight Drift',
    colors: { primaryHue: 220, accentHue: 160, backgroundLightness: 8 }
  },
  sunset: {
    name: 'Sunset Bloom',
    colors: { primaryHue: 30, accentHue: 12, backgroundLightness: 20 }
  }
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      currentTheme: presets.neon,
      updateColor: (key, value) => {
        set((state) => {
          const nextTheme = {
            ...state.currentTheme,
            colors: { ...state.currentTheme.colors, [key]: value }
          };
          applyThemeToDocument(nextTheme.colors);
          return { currentTheme: nextTheme };
        });
      },
      applyPreset: (presetKey) => {
        const preset = presets[presetKey];
        set({ currentTheme: preset });
        applyThemeToDocument(preset.colors);
      },
      exportTheme: () => {
        const json = JSON.stringify(get().currentTheme, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `${get().currentTheme.name.replace(/\s+/g, '-')}.json`;
        anchor.click();
        URL.revokeObjectURL(url);
      },
      importTheme: (json) => {
        try {
          const parsed = JSON.parse(json) as ThemeDefinition;
          set({ currentTheme: parsed });
          applyThemeToDocument(parsed.colors);
        } catch (error) {
          console.error('Invalid theme file', error);
        }
      }
    }),
    {
      name: 'hypergx-theme',
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyThemeToDocument(state.currentTheme.colors);
        }
      }
    }
  )
);

function applyThemeToDocument(colors: ThemeDefinition['colors']) {
  const root = document.documentElement;
  root.style.setProperty('--gx-primary-hue', `${colors.primaryHue}`);
  root.style.setProperty('--gx-accent-hue', `${colors.accentHue}`);
  root.style.setProperty('--gx-background-lightness', `${colors.backgroundLightness}`);
}

// Initialise les variables CSS à l'ouverture de l'app
if (typeof window !== 'undefined') {
  applyThemeToDocument(presets.neon.colors);
}
