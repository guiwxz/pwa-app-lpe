import React from "react"
import Alert from "../../components/Alert";
import ModalDialog from "../../components/ModalDialog";
import TextField from "../../components/TextField";
import useProducts from "../../store/products/useProducts";
import useSales from "../../store/sales/useSales";

interface FormProps {
  isEdit: boolean
}

const Form: React.FC<FormProps> = ({ isEdit }) => {


  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (() => {

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        //@ts-ignore
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        
        form.classList.add('was-validated')
      }, false)
    })
  })()

  const {
    updateSale,
    insertSale,
    handleChange,
    sale,
    setSale,
    alert,
  } = useSales();

  const {
    productsList
  } = useProducts();

  const [desconto, setDesconto] = React.useState<number>(0);
  
  const handleCalculateValue = (productId: number) => {
    const product = productsList.find(it => it.codigo == productId as unknown);
    let newValue = product?.preco! * sale.qtde_venda;

    setSale(current => ({
      ...current,
      valor: newValue,
      valor_total: newValue,
    }))

  }

  // const handleTotalValue = (desconto: number) => {
  //   let valorTotal = sale.valor - (sale.valor * desconto / 100);
  //   setSale(current => ({
  //     ...current,
  //     valor_total: valorTotal
  //   }))

  // }

  
  const handleSubmit = (e: React.FormEvent<Element>) => {
    isEdit ? updateSale(e) : insertSale(e);

    //setDesconto(0);
  }

  return (
    <ModalDialog id="modalVendas" title={'Venda'}>
      <form id="formulario" onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="modal-body">
          <Alert alert={alert} />

          <TextField
            required
            label={'Descrição da venda'}
            name="descricao"
            onChange={handleChange}
            value={sale?.descricao}
          />

          <TextField
            required
            type='number'
            label={'Quantidade venda'}
            name="qtde_venda"
            onChange={(e) => {
              handleChange(e);
              setSale(current => ({
                ...current,
                valor: 0,
                valor_total: 0,
              }))
              //setDesconto(0);
            }}
            
            value={sale?.qtde_venda}
          />

          <div className="form-group">
            <label htmlFor="selectProduct" className="form-label">
              Produto
            </label>
            <select 
              required 
              className="form-control"
              name="produto" 
              value={sale?.produto} 
              id="selectProduct"
              onChange={
                (e) => {
                  handleChange(e);
                  handleCalculateValue(Number(e.target.value));
                  //handleTotalValue(Number(e.target.value));
                }
              }>
                <option disabled value="">
                  (Selecione o produto)
                </option>
                {productsList?.map((it) => (
                  <option
                    key={it.codigo} 
                    value={it.codigo}
                  >
                    {it.nome}
                  </option>
                ))
              }
            </select>
            <div className="valid-feedback">
              Campo `produto` OK
            </div>
            <div className="invalid-feedback">
              Selecione um produto
            </div>
          </div>


          <TextField
            required
            label={'Valor'}
            type='number'
            name="valor"
            onChange={handleChange}
            value={sale?.valor}
            readOnly
          />

          {/* <TextField
            label={'Desconto (%)'}
            type='number'
            name="desconto"
            onChange={(e) => {
              setDesconto(Number(e.target.value));
              handleTotalValue(Number(e.target.value))
            }}
            value={desconto || sale.desconto!}
          />   */}

          <TextField
            required
            type='number'
            label={'Valor total'}
            name="valor_total"
            onChange={handleChange}
            value={sale?.valor_total}
          />

          

        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          <button type="submit" className="btn btn-success">
            Confirmar  <i className="bi bi-save"></i>
          </button>
        </div>
      </form>
    </ModalDialog>
  )

}

export default Form