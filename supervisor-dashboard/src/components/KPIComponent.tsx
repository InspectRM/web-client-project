// src/components/KPIComponent.tsx
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface KPIProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

const KPIComponent: React.FC<KPIProps> = ({ label, value, icon }) => {
  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: 'background.paper',
        color: 'text.primary',
        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Box display="flex" alignItems="center">
        <Box
          sx={{
            backgroundColor: 'primary.main',
            borderRadius: '50%',
            padding: 1.5,
            color: '#fff',
            marginRight: 2,
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="h6">{label}</Typography>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {value}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default KPIComponent;
