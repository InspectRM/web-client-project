// src/components/SparklineComponent.tsx
import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Paper, Typography } from '@mui/material';

interface SparklineComponentProps {
  data?: any;
}

const defaultData = [
  { value: 100 },
  { value: 200 },
  { value: 150 },
  { value: 250 },
  { value: 300 },
];

const SparklineComponent: React.FC<SparklineComponentProps> = ({ data }) => {
  const sparkData = data ? data.sparkline : defaultData;

  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: 'background.paper',
        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Sales Growth
      </Typography>
      <ResponsiveContainer width="100%" height={100}>
        <LineChart data={sparkData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#ff6f61"
            strokeWidth={2}
            dot={false}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default SparklineComponent;
