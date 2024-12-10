// src/components/LiveDataChart.tsx
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Paper, Typography } from '@mui/material';
import axios from 'axios';

interface LiveDataPoint {
  time: string;
  value: number;
}

const LiveDataChart: React.FC = () => {
  const [data, setData] = useState<LiveDataPoint[]>([]);

  useEffect(() => {
    // Function to fetch live data from an API
    const fetchData = async () => {
      try {
        // Example API call to fetch current temperature data
        // Replace with your actual API endpoint
        const response = await axios.get('https://api.example.com/live-data');
        const newPoint: LiveDataPoint = {
          time: new Date().toLocaleTimeString(),
          value: response.data.value,
        };
        setData((prevData) => [...prevData.slice(-19), newPoint]); // Keep last 20 data points
      } catch (error) {
        console.error('Error fetching live data:', error);
        // Simulate data if API call fails
        const simulatedPoint: LiveDataPoint = {
          time: new Date().toLocaleTimeString(),
          value: Math.floor(Math.random() * 100),
        };
        setData((prevData) => [...prevData.slice(-19), simulatedPoint]);
      }
    };

    // Fetch data every second
    const interval = setInterval(fetchData, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: 'background.paper',
        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
        marginTop: 4,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Live Data Feed
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip
            contentStyle={{ backgroundColor: '#23233d', border: 'none' }}
            labelStyle={{ color: '#ffffff' }}
            itemStyle={{ color: '#ffffff' }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#ff6f61"
            strokeWidth={2}
            isAnimationActive={false}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default LiveDataChart;
