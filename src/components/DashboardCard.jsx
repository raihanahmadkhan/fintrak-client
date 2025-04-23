import React from 'react';
import { Box, Paper, Typography, useTheme, alpha, Tooltip, useMediaQuery } from '@mui/material';
import { useThemeContext } from '../ThemeContext';

/**
 * A reusable card component for dashboard statistics and metrics
 */
const DashboardCard = ({ 
  title, 
  value, 
  icon, 
  color = 'primary', 
  subtitle = null,
  onClick = null,
  tooltipText = null
}) => {
  const theme = useTheme();
  const { mode } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Color mappings for specific dashboard card types
  const colorMapping = {
    primary: {
      light: '#0288d1',
      main: '#0277bd',
      dark: '#01579b',
      contrastText: '#fff'
    },
    success: {
      light: '#4caf50',
      main: '#2e7d32',
      dark: '#1b5e20',
      contrastText: '#fff'
    },
    warning: {
      light: '#ff9800',
      main: '#ed6c02',
      dark: '#e65100',
      contrastText: '#fff'
    },
    error: {
      light: '#ef5350',
      main: '#d32f2f',
      dark: '#c62828',
      contrastText: '#fff'
    }
  };
  
  // Use custom color scheme or fallback to theme color
  const cardColor = colorMapping[color] || theme.palette[color];
  
  const cardContent = (
    <Paper
      elevation={2}
      sx={{
        p: 0,
        borderRadius: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        ...(onClick && {
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[8]
          }
        }),
        background: mode === 'dark' 
          ? `linear-gradient(135deg, ${alpha(cardColor.dark, 0.9)} 0%, ${alpha(cardColor.dark, 0.7)} 100%)`
          : `linear-gradient(135deg, ${alpha(cardColor.light, 0.9)} 0%, ${alpha(cardColor.light, 0.7)} 100%)`,
        border: `1px solid ${alpha(cardColor.main, mode === 'dark' ? 0.3 : 0.1)}`,
        color: cardColor.contrastText || (mode === 'dark' ? '#fff' : '#fff'),
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flex: 1,
          width: isMobile ? '100%' : 'auto',
          textAlign: isMobile ? 'center' : 'left'
        }}
      >
        <Typography 
          variant="body2" 
          fontWeight={500} 
          sx={{ 
            opacity: 0.85,
            mb: 1
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="h3" 
          sx={{ 
            mb: subtitle ? 1 : 0, 
            fontWeight: 700,
            lineHeight: 1,
            color: 'inherit',
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' }
          }}
        >
          {value}
        </Typography>
        {subtitle && (
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 1,
              opacity: 0.75,
              fontWeight: 500
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      
      <Box
        sx={{
          p: isMobile ? 2 : 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'inherit',
          opacity: 0.8
        }}
      >
        <Box sx={{ 
          transform: { xs: 'scale(1.2)', sm: 'scale(1.5)' },
          '& .MuiSvgIcon-root': {
            fontSize: { xs: '2.25rem', sm: '3rem' }
          }
        }}>
          {icon}
        </Box>
      </Box>
    </Paper>
  );

  if (tooltipText) {
    return (
      <Tooltip title={tooltipText} arrow>
        {cardContent}
      </Tooltip>
    );
  }

  return cardContent;
};

export default DashboardCard; 