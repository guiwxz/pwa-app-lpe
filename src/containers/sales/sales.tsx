import React from "react";
import Tabela from "./Tabela";
import Form from "./Form";

import SalesProvider from "../../store/sales/salesProvider";
import ProductsProvider from "../../store/products/productsProvider";
import { withAuth } from "../../store/auth/withAuth";

const Sales: React.FC = () => {
  const [isEdit, setIsEdit] = React.useState(false);

  return (
    <ProductsProvider>
      <SalesProvider>
        <Tabela setIsEdit={setIsEdit} />
        <Form isEdit={isEdit} />
      </SalesProvider>
    </ProductsProvider>
  )
}

export default withAuth(Sales);