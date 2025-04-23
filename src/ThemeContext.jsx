import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create the theme context
const ThemeContext = createContext({
  mode: 'light',
  toggleColorMode: () => {},
});

// Theme context provider component
export const ThemeContextProvider = ({ children }) => {
  // Use localStorage to persist theme preference
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  // Toggle theme function
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Update localStorage when mode changes
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  // Create the theme object
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // Light mode palette - with improved contrast
                primary: {
                  main: '#3550DF', // Darker blue for better contrast
                  light: '#5e75f4',
                  dark: '#2C41BD', // Darkened for better visibility
                  contrastText: '#ffffff',
                },
                secondary: {
                  main: '#3730B1', // Darkened for better contrast
                  light: '#4d47d1',
                  dark: '#2D279A',
                  contrastText: '#ffffff',
                },
                success: {
                  main: '#0EA5D9', // Darkened teal/blue for better contrast
                  light: '#45BADE',
                  dark: '#0B85B0',
                },
                error: {
                  main: '#D92D50', // Darker red for better contrast
                  light: '#E05A76',
                  dark: '#BA2644',
                },
                warning: {
                  main: '#E8AB10', // Darkened yellow for better contrast
                  light: '#EEBA3F',
                  dark: '#CC960E',
                },
                info: {
                  main: '#0A77A0', // Darker blue for better contrast
                  light: '#22A6D5',
                  dark: '#095F80',
                },
                background: {
                  default: '#f5f8fa',
                  paper: '#ffffff',
                },
                text: {
                  primary: '#1A202C', // Darker for better readability
                  secondary: '#4A5568', // Darker for better contrast
                  disabled: '#718096', // Darker for better visibility
                },
                divider: 'rgba(0, 0, 0, 0.12)', // Darker for better visibility
                icon: '#4A5568', // Added specific color for icons in light mode
              }
            : {
                // Dark mode palette
                primary: {
                  main: '#4361ee',
                  light: '#5e75f4',
                  dark: '#3a56d4',
                  contrastText: '#ffffff',
                },
                secondary: {
                  main: '#3f37c9',
                  light: '#4d47d1',
                  dark: '#3730b1',
                  contrastText: '#ffffff',
                },
                success: {
                  main: '#4cc9f0',
                  light: '#70d5f3',
                  dark: '#37b6db',
                },
                error: {
                  main: '#ef476f',
                  light: '#f16d8b',
                  dark: '#d62b52',
                },
                warning: {
                  main: '#ffd166',
                  light: '#ffdb85',
                  dark: '#e6bc5c',
                },
                info: {
                  main: '#118ab2',
                  light: '#2e9abe',
                  dark: '#0c7a9d',
                },
                background: {
                  default: '#161C24',
                  paper: '#212B36',
                },
                text: {
                  primary: '#f5f5f5',
                  secondary: '#c2c2c2',
                  disabled: '#6b7280',
                },
                divider: 'rgba(145, 158, 171, 0.24)',
                icon: '#c2c2c2', // Added specific color for icons in dark mode
              }),
        },
        shape: {
          borderRadius: 8,
        },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
            lineHeight: 1.2,
          },
          h2: {
            fontWeight: 700,
            fontSize: '2rem',
            lineHeight: 1.3,
          },
          h3: {
            fontWeight: 600,
            fontSize: '1.75rem',
            lineHeight: 1.4,
          },
          h4: {
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: 1.4,
          },
          h5: {
            fontWeight: 500,
            fontSize: '1.25rem',
            lineHeight: 1.5,
          },
          h6: {
            fontWeight: 500,
            fontSize: '1rem',
            lineHeight: 1.6,
          },
          subtitle1: {
            fontWeight: 500,
            fontSize: '0.875rem',
          },
          subtitle2: {
            fontWeight: 500,
            fontSize: '0.8125rem',
          },
          body1: {
            fontSize: '0.875rem',
            lineHeight: 1.6,
          },
          body2: {
            fontSize: '0.8125rem',
            lineHeight: 1.6,
          },
    button: {
            fontWeight: 500,
            fontSize: '0.875rem',
      textTransform: 'none',
          },
        },
        shadows: [
          'none',
          '0px 2px 1px -1px rgba(0,0,0,0.06),0px 1px 1px 0px rgba(0,0,0,0.04),0px 1px 3px 0px rgba(0,0,0,0.04)',
          '0px 3px 1px -2px rgba(0,0,0,0.06),0px 2px 2px 0px rgba(0,0,0,0.04),0px 1px 5px 0px rgba(0,0,0,0.04)',
          '0px 3px 3px -2px rgba(0,0,0,0.06),0px 3px 4px 0px rgba(0,0,0,0.04),0px 1px 8px 0px rgba(0,0,0,0.04)',
          '0px 2px 4px -1px rgba(0,0,0,0.06),0px 4px 5px 0px rgba(0,0,0,0.04),0px 1px 10px 0px rgba(0,0,0,0.04)',
          '0px 3px 5px -1px rgba(0,0,0,0.06),0px 5px 8px 0px rgba(0,0,0,0.04),0px 1px 14px 0px rgba(0,0,0,0.04)',
          '0px 3px 5px -1px rgba(0,0,0,0.06),0px 6px 10px 0px rgba(0,0,0,0.04),0px 1px 18px 0px rgba(0,0,0,0.04)',
          '0px 4px 5px -2px rgba(0,0,0,0.06),0px 7px 10px 1px rgba(0,0,0,0.04),0px 2px 16px 1px rgba(0,0,0,0.04)',
          '0px 5px 5px -3px rgba(0,0,0,0.06),0px 8px 10px 1px rgba(0,0,0,0.04),0px 3px 14px 2px rgba(0,0,0,0.04)',
          '0px 5px 6px -3px rgba(0,0,0,0.06),0px 9px 12px 1px rgba(0,0,0,0.04),0px 3px 16px 2px rgba(0,0,0,0.04)',
          '0px 6px 6px -3px rgba(0,0,0,0.06),0px 10px 14px 1px rgba(0,0,0,0.04),0px 4px 18px 3px rgba(0,0,0,0.04)',
          '0px 6px 7px -4px rgba(0,0,0,0.06),0px 11px 15px 1px rgba(0,0,0,0.04),0px 4px 20px 3px rgba(0,0,0,0.04)',
          '0px 7px 8px -4px rgba(0,0,0,0.06),0px 12px 17px 2px rgba(0,0,0,0.04),0px 5px 22px 4px rgba(0,0,0,0.04)',
          '0px 7px 8px -4px rgba(0,0,0,0.06),0px 13px 19px 2px rgba(0,0,0,0.04),0px 5px 24px 4px rgba(0,0,0,0.04)',
          '0px 7px 9px -4px rgba(0,0,0,0.06),0px 14px 21px 2px rgba(0,0,0,0.04),0px 5px 26px 4px rgba(0,0,0,0.04)',
          '0px 8px 9px -5px rgba(0,0,0,0.06),0px 15px 22px 2px rgba(0,0,0,0.04),0px 6px 28px 5px rgba(0,0,0,0.04)',
          '0px 8px 10px -5px rgba(0,0,0,0.06),0px 16px 24px 2px rgba(0,0,0,0.04),0px 6px 30px 5px rgba(0,0,0,0.04)',
          '0px 8px 11px -5px rgba(0,0,0,0.06),0px 17px 26px 2px rgba(0,0,0,0.04),0px 6px 32px 5px rgba(0,0,0,0.04)',
          '0px 9px 11px -5px rgba(0,0,0,0.06),0px 18px 28px 2px rgba(0,0,0,0.04),0px 7px 34px 6px rgba(0,0,0,0.04)',
          '0px 9px 12px -6px rgba(0,0,0,0.06),0px 19px 29px 2px rgba(0,0,0,0.04),0px 7px 36px 6px rgba(0,0,0,0.04)',
          '0px 10px 13px -6px rgba(0,0,0,0.06),0px 20px 31px 3px rgba(0,0,0,0.04),0px 8px 38px 7px rgba(0,0,0,0.04)',
          '0px 10px 13px -6px rgba(0,0,0,0.06),0px 21px 33px 3px rgba(0,0,0,0.04),0px 8px 40px 7px rgba(0,0,0,0.04)',
          '0px 10px 14px -6px rgba(0,0,0,0.06),0px 22px 35px 3px rgba(0,0,0,0.04),0px 8px 42px 7px rgba(0,0,0,0.04)',
          '0px 11px 14px -7px rgba(0,0,0,0.06),0px 23px 36px 3px rgba(0,0,0,0.04),0px 9px 44px 8px rgba(0,0,0,0.04)',
          '0px 11px 15px -7px rgba(0,0,0,0.06),0px 24px 38px 3px rgba(0,0,0,0.04),0px 9px 46px 8px rgba(0,0,0,0.04)',
        ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
                borderRadius: 8,
          textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                },
              },
              sizeLarge: {
                height: 48,
              },
              sizeMedium: {
                height: 40,
              },
              sizeSmall: {
                height: 32,
              },
              contained: {
          '&:hover': {
                  boxShadow: 'none',
                },
              },
            },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
                  borderRadius: 8,
                },
              },
            },
    },
    MuiCard: {
      styleOverrides: {
        root: {
                borderRadius: 12,
                boxShadow: mode === 'dark' 
                  ? '0 0 2px 0 rgba(0,0,0,0.3), 0 12px 24px -4px rgba(0,0,0,0.5)'
                  : '0 0 2px 0 rgba(0,0,0,0.12), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
              },
            },
          },
          MuiCardHeader: {
      styleOverrides: {
        root: {
                padding: '24px',
              },
            },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
                padding: '24px',
              },
            },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
                boxShadow: mode === 'dark' 
                  ? '0 0 8px 0 rgba(0,0,0,0.37)'
                  : '0 0 8px 0 rgba(145, 158, 171, 0.12)',
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                borderRight: 0,
              },
            },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
                fontWeight: 600,
                backgroundColor: mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.04)'
                  : 'rgba(145, 158, 171, 0.08)',
              },
            },
          },
          MuiListItemButton: {
      styleOverrides: {
        root: {
                borderRadius: 8,
                '&:hover': {
                  backgroundColor: mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(145, 158, 171, 0.08)',
                },
              },
            },
          },
          MuiTabs: {
            styleOverrides: {
              indicator: {
                height: 3,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
              },
            },
          },
          MuiTab: {
      styleOverrides: {
        root: {
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.875rem',
              },
            },
          },
          MuiSelect: {
      styleOverrides: {
              outlined: {
                borderRadius: 8,
              },
            },
          },
          MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 8,
              },
            },
          },
          MuiOutlinedInput: {
      styleOverrides: {
        root: {
                borderRadius: 8,
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              rounded: {
                borderRadius: 12,
              },
            },
          },
          MuiPopover: {
            styleOverrides: {
              paper: {
                boxShadow: mode === 'dark' 
                  ? '0 0 2px 0 rgba(0,0,0,0.3), 0 12px 24px -4px rgba(0,0,0,0.5)'
                  : '0 0 2px 0 rgba(0,0,0,0.12), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
              },
            },
          },
          MuiDialog: {
            styleOverrides: {
              paper: {
                borderRadius: 16,
                boxShadow: mode === 'dark' 
                  ? '0 0 2px 0 rgba(0,0,0,0.3), 0 24px 48px -4px rgba(0,0,0,0.5)'
                  : '0 0 2px 0 rgba(0,0,0,0.12), 0 24px 48px -4px rgba(145, 158, 171, 0.16)',
              },
            },
          },
          MuiChip: {
          styleOverrides: {
            root: {
                borderRadius: 6,
              },
            },
          },
        },
      }),
    [mode],
  );

  // Context value
  const contextValue = useMemo(
    () => ({
      mode,
      toggleColorMode,
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export default ThemeContext;