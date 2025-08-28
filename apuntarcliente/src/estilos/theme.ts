export const getDesignTokens = (mode: 'light' | 'dark') => ({

    palette: {
        mode,
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#9c27b0',
        },
        ...(mode === 'dark'
            ? {
                background: {
                    default: '#121212',
                    paper: '#1e1e1e'
                },
            }
            : {
                background: {
                    default: '#f5f5f5',
                    paper: '#ffffff',
                },
            }
        ),
    },
    typography: {
        fontFamily: [
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
    },

});