import { ReactNode, useEffect } from 'react';
import { useThemeStore } from '../stores/theme-store';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { currentTheme } = useThemeStore();

  useEffect(() => {
    const { colors } = currentTheme;
    const root = document.documentElement;
    root.style.setProperty('--gx-primary-hue', `${colors.primaryHue}`);
    root.style.setProperty('--gx-accent-hue', `${colors.accentHue}`);
    root.style.setProperty('--gx-background-lightness', `${colors.backgroundLightness}`);
  }, [currentTheme]);

  return <>{children}</>;
}
