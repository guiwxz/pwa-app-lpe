import React from 'react';
import { ProductsContext } from './productsProvider';

const useProducts = () => {
  const context = React.useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts() deve estar dentro de um <Provider />')
  }

  return context;
}

export default useProducts;