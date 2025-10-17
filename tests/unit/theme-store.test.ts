import { describe, expect, it } from 'vitest';
import { useThemeStore } from '../../app/renderer/stores/theme-store';

describe('theme store', () => {
  it('updates hue', () => {
    const { updateColor, currentTheme } = useThemeStore.getState();
    updateColor('primaryHue', 120);
    expect(useThemeStore.getState().currentTheme.colors.primaryHue).toBe(120);
    // reset
    updateColor('primaryHue', currentTheme.colors.primaryHue);
  });
});
