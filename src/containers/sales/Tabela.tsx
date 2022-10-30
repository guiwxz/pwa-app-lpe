import React from "react";
import Alert from "../../components/Alert";
import useProducts from "../../store/products/useProducts";
import useSales from "../../store/sales/useSales";

import moment from 'moment'

interface TabelaProps {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const Tabela: React.FC<TabelaProps> = ({ setIsEdit }) => {

  const {
    deleteSale,
    fetchSale,
    setSale,
    salesList,
    alert,
    setAlert
  } = useSales();

  const {
    fetchProduct,
    fetchProducts,
  } = useProducts();


  React.useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <div style={{ padding: '20px', width: '100%' }}>
      <h1>Vendas</h1>
      <button 
        className="btn btn-info" 
        data-bs-toggle="modal" 
        data-bs-target="#modalVendas"
        onClick={() => {
          setSale({
            codigo: 0,
            descricao: '',
            produto: '',
            qtde_venda: 0,
            valor: 0,
            valor_total: 0, 
            codigo_produto: 0
          })
          setIsEdit(false);
          setAlert({ status: "", message: "" })
        }}
      >
        <i className="bi bi-pencil-square"></i>
      </button>
      <Alert alert={alert} />
      {(!salesList || (salesList && salesList.length === 0)) && <h3>Nenhuma venda encontrada</h3>}
      {salesList && salesList.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Data/Hora</th>
              <th scope="col">Descrição</th>
              <th scope="col">Produto</th>
              <th scope="col">Quantidade</th>
              <th scope="col">Valor total</th>
              <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {salesList.map(it => (
              <tr key={it.codigo}>
                <td>{moment(it.data_inc).format('DD/MM/YYYY - HH:mm')}</td>
                <td>{it.descricao}</td>
                <td>{it.produto}</td>
                <td>{it.qtde_venda}</td>
                <td>{it.valor_total}</td>

                <td align="center">
                  <button 
                    className="btn btn-info" 
                    data-bs-toggle="modal" 
                    data-bs-target="#modalVendas"
                    onClick={() => {
                      fetchSale(it.codigo)
                      fetchProduct(it.codigo_produto)
                      setIsEdit(true)
                      setAlert({ status: '', message: '' })
                    }}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button 
                    className="btn btn-danger" 
                    title="Remover"
                    onClick={() => { 
                      deleteSale(it.codigo); 
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )

}

export default Tabela;