// src/components/BulletGraphComponent.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import { Paper, Typography } from '@mui/material';

interface BulletGraphComponentProps {
  data?: any;
}

const defaultData = [
  {
    name: 'Performance',
    actual: 75,
    target: 100,
    marker: 90,
  },
];

const COLORS = {
  actual: '#ff6f61',
  target: '#4a90e2',
  marker: '#00C49F',
};

const BulletGraphComponent: React.FC<BulletGraphComponentProps> = ({ data }) => {
  const chartData = data ? [data] : defaultData;

  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: 'background.paper',
        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Performance Tracking
      </Typography>
      <ResponsiveContainer width="100%" height={150}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" stroke="#ffffff" />
          <YAxis domain={[0, 120]} stroke="#ffffff" />
          <Tooltip
            formatter={(value: number) => `${value}%`}
            contentStyle={{ backgroundColor: '#23233d', border: 'none' }}
            labelStyle={{ color: '#ffffff' }}
            itemStyle={{ color: '#ffffff' }}
          />
          {/* Actual Performance Bar */}
          <Bar dataKey="actual" fill={COLORS.actual} barSize={30} />
          {/* Target Reference Line */}
          <ReferenceLine y={chartData[0].target} stroke={COLORS.target} strokeDasharray="3 3" label={{ value: 'Target', position: 'top', fill: '#ffffff' }} />
          {/* Marker Reference Line */}
          <ReferenceLine y={chartData[0].marker} stroke={COLORS.marker} strokeDasharray="3 3" label={{ value: 'Marker', position: 'top', fill: '#ffffff' }} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default BulletGraphComponent;
