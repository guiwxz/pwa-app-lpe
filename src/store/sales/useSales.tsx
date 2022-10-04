import React from 'react';
import { SalesContext } from './salesProvider';

const useSales = () => {
  const context = React.useContext(SalesContext);

  if (!context) {
    throw new Error('useSales() deve estar dentro de um <Provider />')
  }

  return context;
}

export default useSales;