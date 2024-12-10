// DataTable.tsx
import React, { useState, useEffect, useContext } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import { fetchProducts } from '../services/api';
import { ProductContext } from '../context/ProductContext';

interface Product {
  id: string;
  name: string;
  sales: number;
}

interface DataTableProps {
  onRowSelect: (row: Product) => void;
}

const DataTable: React.FC<DataTableProps> = ({ onRowSelect }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { setSelectedProduct } = useContext(ProductContext);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Simulate data if API call fails
        const simulatedProducts: Product[] = [
          { id: '1', name: 'Eagle Eye Security Camera', sales: 159 },
          { id: '2', name: 'Swift Stream Laptop', sales: 237 },
          { id: '3', name: 'Zenith Smartwatch', sales: 262 },
          { id: '4', name: 'Pulse Fit Fitness Tracker', sales: 305 },
          { id: '5', name: 'Nimbus Drone', sales: 356 },
          { id: '6', name: 'Aura Home Speaker', sales: 298 },
        ];
        setProducts(simulatedProducts);
        setError('Failed to fetch products. Displaying simulated data.');
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleRowClick = (product: Product) => {
    setSelectedRow(product.id);
    setSelectedProduct(product.name); // Update context
    onRowSelect(product); // Notify parent component
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '200px',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        padding: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Product Sales Table
      </Typography>
      {error && (
        <Typography variant="body2" color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <TableContainer>
        <Table aria-label="product sales table" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Sales</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                hover
                selected={selectedRow === product.id}
                onClick={() => handleRowClick(product)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">{product.sales}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DataTable;
