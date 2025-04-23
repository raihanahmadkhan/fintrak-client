import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3', // Vibrant blue
      light: '#64b5f6',
      dark: '#1976d2'
    },
    secondary: {
      main: '#f50057', // Vibrant pink
      light: '#ff4081',
      dark: '#c51162'
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
      card: '#252525'
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5'
    },
    success: {
      main: '#4caf50',
      light: '#81c784'
    },
    error: {
      main: '#f44336',
      light: '#e57373'
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d'
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500
    },
    h2: {
      fontWeight: 500
    },
    h3: {
      fontWeight: 500
    },
    h4: {
      fontWeight: 500
    },
    h5: {
      fontWeight: 500
    },
    h6: {
      fontWeight: 500
    },
    button: {
      textTransform: 'none',
      fontWeight: 500
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px'
        },
        containedPrimary: {
          boxShadow: '0 4px 6px rgba(33, 150, 243, 0.25)',
          '&:hover': {
            boxShadow: '0 6px 10px rgba(33, 150, 243, 0.35)'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        },
        elevation1: {
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)'
        },
        elevation3: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)'
        },
        elevation6: {
          boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.2)'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: 'hidden'
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 20
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: 'rgba(33, 150, 243, 0.08)'
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td, &:last-child th': {
            border: 0
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)'
          }
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1a1a1a',
          borderRight: '1px solid rgba(255, 255, 255, 0.05)'
        }
      }
    }
  }
});

export default theme;
