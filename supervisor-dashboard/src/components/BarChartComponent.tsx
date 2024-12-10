// src/components/BarChartComponent.tsx
import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { Paper, Typography } from '@mui/material';
import { fetchSales } from '../services/api';

interface SalesData {
  month: string;
  [key: string]: any;
}

interface BarChartComponentProps {
  product?: string;
}

const COLORS = ['#ff6f61', '#4a90e2', '#00C49F', '#FFBB28', '#FF8042', '#0088FE'];

const BarChartComponent: React.FC<BarChartComponentProps> = ({ product }) => {
  const [chartData, setChartData] = useState<SalesData[]>([]);
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    const getSalesData = async () => {
      try {
        const response = await fetchSales();
        const salesData = response.data;

        const aggregatedData: { [key: string]: any } = {};
        salesData.forEach((item: any) => {
          const { month, product: productName, sales } = item;
          if (!aggregatedData[month]) {
            aggregatedData[month] = { month };
          }
          aggregatedData[month][productName] = sales;
        });

        const dataArray = Object.values(aggregatedData);
        const productNames: string[] = Array.from(new Set(salesData.map((item: any) => item.product)));

        // Filter data based on selected product
        if (product) {
          // For the selected product, show only that product's sales
          const filteredData = (dataArray as SalesData[]).map(item => ({
            month: item.month,
            [product]: item[product] || 0,
          }));
          setChartData(filteredData);
          setProducts([product]);
        } else {
          // Show all products if none selected
          setChartData(dataArray as SalesData[]);
          setProducts(productNames);
        }
      } catch (error) {
        console.error('Error fetching sales data:', error);
        // Simulated data if API fails
        const simulatedData: SalesData[] = [
          { month: 'January', 'Eagle Eye Security Camera': 5000, 'Swift Stream Laptop': 4000, 'Zenith Smartwatch': 3000 },
          { month: 'February', 'Eagle Eye Security Camera': 6000, 'Swift Stream Laptop': 4500, 'Zenith Smartwatch': 3500 },
          { month: 'March', 'Eagle Eye Security Camera': 7000, 'Swift Stream Laptop': 5000, 'Zenith Smartwatch': 4000 },
          { month: 'April', 'Eagle Eye Security Camera': 6500, 'Swift Stream Laptop': 4800, 'Zenith Smartwatch': 4200 },
          { month: 'May', 'Eagle Eye Security Camera': 7200, 'Swift Stream Laptop': 5300, 'Zenith Smartwatch': 4600 },
          { month: 'June', 'Eagle Eye Security Camera': 8000, 'Swift Stream Laptop': 6000, 'Zenith Smartwatch': 5000 },
        ];
        const fallbackProducts = ['Eagle Eye Security Camera', 'Swift Stream Laptop', 'Zenith Smartwatch'];

        if (product) {
          const filteredData = simulatedData.map(item => ({
            month: item.month,
            [product]: item[product] || 0,
          }));
          setChartData(filteredData);
          setProducts([product]);
        } else {
          setChartData(simulatedData);
          setProducts(fallbackProducts);
        }
      }
    };

    getSalesData();
  }, [product]);

  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: 'background.paper',
        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
        height: '100%',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Monthly Sales Comparison
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="month" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip
            contentStyle={{ backgroundColor: '#23233d', border: 'none' }}
            labelStyle={{ color: '#ffffff' }}
            itemStyle={{ color: '#ffffff' }}
          />
          <Legend />
          {products.map((prod, index) => (
            <Bar
              key={prod}
              dataKey={prod}
              fill={COLORS[index % COLORS.length]}
              barSize={20}
              animationDuration={1500}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default BarChartComponent;
