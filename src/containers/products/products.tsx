import React from "react";
import Tabela from "./Tabela";
import Form from "./Form";

import ProductsProvider from "../../store/products/productsProvider";

const Products: React.FC = () => {
  const [isEdit, setIsEdit] = React.useState(false);

  return (
    <ProductsProvider>
      <Tabela setIsEdit={setIsEdit} />
      <Form isEdit={isEdit} />
    </ProductsProvider>
  )
}

export default Products