// src/components/DrilldownChart.tsx
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { Paper, Typography } from '@mui/material';
import { fetchSales } from '../services/api';

interface DataItem {
  name: string;
  value: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#4a90e2', '#FF6F61'];

const DrilldownChart: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [level, setLevel] = useState<number>(1);
  const [title, setTitle] = useState<string>('Yearly Sales by Product');

  useEffect(() => {
    const getSalesData = async () => {
      try {
        const response = await fetchSales();
        const salesData = response.data;

        if (level === 1) {
          // Aggregate sales per product for the year
          const yearlyData: DataItem[] = salesData.reduce((acc: DataItem[], item: any) => {
            const { product, sales } = item;
            const existing = acc.find((data) => data.name === product);
            if (existing) {
              existing.value += item.sales;
            } else {
              acc.push({ name: product, value: item.sales });
            }
            return acc;
          }, []);
          setData(yearlyData);
          setTitle('Yearly Sales by Product');
        } else if (level === 2) {
          // For simplicity, aggregate sales per month for a selected product
          // Here, we can prompt the user to select a product or use the first one
          const selectedProduct = data[0]?.name || 'Eagle Eye Security Camera';
          const monthlyData: DataItem[] = salesData
            .filter((item: any) => item.product === selectedProduct)
            .map((item: any) => ({
              name: item.month,
              value: item.sales,
            }));
          setData(monthlyData);
          setTitle(`Monthly Sales for ${selectedProduct}`);
        }
      } catch (error) {
        console.error('Error fetching sales data for Drilldown:', error);
        // Simulate data if API call fails
        if (level === 1) {
          setData([
            { name: 'Eagle Eye Security Camera', value: 50000 },
            { name: 'Swift Stream Laptop', value: 60000 },
            { name: 'Zenith Smartwatch', value: 55000 },
            { name: 'Pulse Fit Fitness Tracker', value: 45000 },
            { name: 'Nimbus Drone', value: 70000 },
            { name: 'Aura Home Speaker', value: 65000 },
          ]);
          setTitle('Yearly Sales by Product');
        } else if (level === 2) {
          setData([
            { name: 'January', value: 5000 },
            { name: 'February', value: 4000 },
            { name: 'March', value: 4500 },
            { name: 'April', value: 6000 },
            { name: 'May', value: 7000 },
            { name: 'June', value: 6500 },
            { name: 'July', value: 8000 },
            { name: 'August', value: 7500 },
            { name: 'September', value: 9000 },
            { name: 'October', value: 8500 },
            { name: 'November', value: 9500 },
            { name: 'December', value: 10000 },
          ]);
          setTitle('Monthly Sales for Eagle Eye Security Camera');
        }
      }
    };

    getSalesData();
  }, [level]);

  const handleClick = () => {
    if (level === 1) {
      // Drill down to product-level
      setLevel(2);
    } else {
      // Drill up to yearly-level
      setLevel(1);
    }
  };

  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: 'background.paper',
        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label
            onClick={handleClick}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                cursor="pointer"
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#23233d', border: 'none' }}
            labelStyle={{ color: '#ffffff' }}
            itemStyle={{ color: '#ffffff' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <Typography variant="caption" display="block" align="center">
        Click on a segment to {level === 1 ? 'view monthly sales' : 'view yearly sales'}
      </Typography>
    </Paper>
  );
};

export default DrilldownChart;
