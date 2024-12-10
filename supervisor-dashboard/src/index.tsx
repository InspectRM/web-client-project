// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { ProductProvider } from './context/ProductContext';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ProductProvider>
        <App />
      </ProductProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
