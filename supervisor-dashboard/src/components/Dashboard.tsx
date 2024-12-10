// src/components/Dashboard.tsx
import React, { useContext } from 'react';
import { Box, Grid } from '@mui/material';
import BarChartComponent from './BarChartComponent';
import LineChartComponent from './LineChartComponent';
import SparklineComponent from './SparklineComponent';
import DataTable from './DataTable';
import KPIComponent from './KPIComponent';
import DrilldownChart from './DrilldownChart';
import LiveDataChart from './LiveDataChart';
import BulletGraphComponent from './BulletGraphComponent';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { ProductContext } from '../context/ProductContext';

interface Product {
  id: string;
  name: string;
  sales: number;
}

const Dashboard: React.FC = () => {
  const { selectedProduct, setSelectedProduct } = useContext(ProductContext);

  const handleRowSelect = (product: Product) => {
    setSelectedProduct(product.name);
    // Additional logic if needed
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* KPIs */}
        <Grid item xs={12} sm={6} md={4}>
          <KPIComponent
            label="Total Sales"
            value="$50,000"
            icon={<TrendingUpIcon fontSize="large" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <KPIComponent
            label="New Users"
            value="1,200"
            icon={<PersonAddIcon fontSize="large" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <KPIComponent
            label="Bounce Rate"
            value="33%"
            icon={<AssessmentIcon fontSize="large" />}
          />
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} lg={6}>
          <BarChartComponent product={selectedProduct || undefined} />
        </Grid>

        {/* Line Chart */}
        <Grid item xs={12} lg={6}>
          <LineChartComponent product={selectedProduct || undefined} />
        </Grid>

        {/* Live Data Chart */}
        <Grid item xs={12} lg={6}>
          <LiveDataChart />
        </Grid>

        {/* Drilldown Chart */}
        <Grid item xs={12} lg={6}>
          <DrilldownChart />
        </Grid>

        {/* Sparklines */}
        <Grid item xs={12} lg={6}>
          <SparklineComponent />
        </Grid>

        {/* Bullet Graph */}
        <Grid item xs={12} lg={6}>
          <BulletGraphComponent />
        </Grid>

        {/* Data Table */}
        <Grid item xs={12}>
          <DataTable onRowSelect={handleRowSelect} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
