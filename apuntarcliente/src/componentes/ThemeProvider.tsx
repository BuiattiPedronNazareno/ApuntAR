'use client';

import * as React from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const ThemeContext = React.createContext<{
  theme: ReturnType<typeof createTheme>;
  mode: 'light' | 'dark'; 
  toggleColorMode: () => void;
}>({
  theme: createTheme({ palette: { mode: 'light' } }),
  mode: 'light',
  toggleColorMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialMode = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setMode(initialMode);

    const root = document.documentElement;
    if (initialMode === 'dark') {
      root.style.setProperty('--background', '#0a0a0a');
      root.style.setProperty('--foreground', '#ededed');
    } else {
      root.style.setProperty('--background', '#ffffff');
      root.style.setProperty('--foreground', '#171717');
    }
  }, []);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#3f51b5',
          },
          ...(mode === 'light'
            ? {
                background: {
                  default: '#f5f5f5',
                  paper: '#ffffff',
                },
              }
            : {
                background: {
                  default: '#121212',
                  paper: '#1e1e1e',
                },
              }),
        },
      }),
    [mode]
  );

  const toggleColorMode = React.useCallback(() => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      
      const root = document.documentElement;
      if (newMode === 'dark') {
        root.style.setProperty('--background', '#0a0a0a');
        root.style.setProperty('--foreground', '#ededed');
      } else {
        root.style.setProperty('--background', '#ffffff');
        root.style.setProperty('--foreground', '#171717');
      }
      
      localStorage.setItem('theme', newMode);
      return newMode;
    });
  }, []);

  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ 
        theme: createTheme({ palette: { mode: 'light' } }), 
        mode: 'light', 
        toggleColorMode 
      }}>
        <MuiThemeProvider theme={createTheme({ palette: { mode: 'light' } })}>
          {children}
        </MuiThemeProvider>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleColorMode }}>
      <MuiThemeProvider theme={theme} key={mode}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => React.useContext(ThemeContext);