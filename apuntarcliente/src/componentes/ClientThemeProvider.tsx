'use client';

import * as React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useThemeContext } from './ThemeProvider';

export default function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeContext();
  
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div suppressHydrationWarning>{children}</div>;
  }
  
  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  );
}