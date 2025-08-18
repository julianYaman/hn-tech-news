import { writable } from 'svelte/store';

const createThemeStore = () => {
  const { subscribe, set } = writable('light');

  return {
    subscribe,
    setTheme: (theme) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', theme);
        document.documentElement.className = theme;
        set(theme);
      }
    },
    init: () => {
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme');
        const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme) {
          document.documentElement.className = savedTheme;
          set(savedTheme);
        } else {
          const initialTheme = userPrefersDark ? 'dark' : 'light';
          document.documentElement.className = initialTheme;
          set(initialTheme);
        }
      }
    }
  };
};

export const theme = createThemeStore();
