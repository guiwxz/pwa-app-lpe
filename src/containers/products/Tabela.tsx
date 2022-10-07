import React from "react";
import Alert from "../../components/Alert";
import useProducts from "../../store/products/useProducts";

interface TabelaProps {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const Tabela: React.FC<TabelaProps> = ({ setIsEdit }) => {

  const {
    productsList,
    deleteProduct,
    fetchProduct,
    setProduct,
    setAlert,
    alert
  } = useProducts();

  return (
    <div style={{ padding: '20px', width: '100%' }}>
      <h1>Produtos</h1>
      <button 
        className="btn btn-info" 
        data-bs-toggle="modal" 
        data-bs-target="#modalProdutos"
        onClick={() => {
          setProduct({
            codigo: 0,
            nome: "",
            cfop: '',
            preco: 0,
            qtde: 0,
          })
          setAlert({ status: "", message: "" })
          setIsEdit(false);
        }}
      >
        <i className="bi bi-pencil-square"></i>
      </button>
      <Alert alert={alert} />
      {(!productsList || (productsList && productsList.length === 0)) && <h3>Nenhum produto encontrado</h3>}
      {productsList && productsList.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Nome</th>
              <th scope="col">Valor Unitário</th>
              <th scope="col">Quantidade</th>
              <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {productsList.map(it => (
              <tr key={it.codigo}>
                <td>{it.codigo}</td>
                <td>{it.nome}</td>
                <td>{it.preco}</td>
                <td>{it.qtde}</td>

                <td align="center">
                  <button 
                    className="btn btn-info" 
                    data-bs-toggle="modal" 
                    data-bs-target="#modalProdutos"
                    onClick={() => {
                      fetchProduct(it.codigo)
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
                      deleteProduct(it.codigo); 
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