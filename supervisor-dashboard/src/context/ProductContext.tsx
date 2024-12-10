// src/context/ProductContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface ProductContextProps {
  selectedProduct: string | null;
  setSelectedProduct: (product: string | null) => void;
}

export const ProductContext = createContext<ProductContextProps>({
  selectedProduct: null,
  setSelectedProduct: () => {},
});

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  return (
    <ProductContext.Provider value={{ selectedProduct, setSelectedProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
