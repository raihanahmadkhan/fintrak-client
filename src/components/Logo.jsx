import React from 'react';
import { Box, useTheme } from '@mui/material';
import { useThemeContext } from '../ThemeContext';

const Logo = ({ size = 40 }) => {
  const { mode } = useThemeContext();
  const theme = useTheme();
  
  return (
    <Box 
      sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: size,
        height: size,
      }}
    >
      {/* Main logo shape */}
      <Box 
        component="div" 
        sx={{ 
          width: size * 0.8, 
          height: size * 0.8, 
          borderRadius: '10%',
          bgcolor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: mode === 'dark' 
            ? '0 2px 10px rgba(67, 97, 238, 0.3)'
            : '0 2px 10px rgba(53, 80, 223, 0.5)',
          transform: 'rotate(12deg)'
        }}
      />
      
      {/* Small accent shape */}
      <Box 
        component="div" 
        sx={{ 
          position: 'absolute',
          top: size * 0.1,
          left: size * 0.1,
          width: size * 0.4, 
          height: size * 0.4, 
          borderRadius: '50%',
          bgcolor: mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.9)' 
            : 'rgba(255, 255, 255, 1)',
          boxShadow: mode === 'dark'
            ? '0 2px 4px rgba(0, 0, 0, 0.1)'
            : '0 2px 6px rgba(0, 0, 0, 0.2)',
        }}
      />
    </Box>
  );
};

export default Logo; 