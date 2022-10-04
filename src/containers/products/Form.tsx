import React from "react"
import Alert from "../../components/Alert";
import ModalDialog from "../../components/ModalDialog";
import TextField from "../../components/TextField";
import useProducts from "../../store/products/useProducts";

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
    alert,
    insertProduct,
    handleChange,
    updateProduct,
    product
  } = useProducts();

  return (
    <ModalDialog id="modalProdutos" title="Produto">
      <form id="formulario" onSubmit={isEdit ? updateProduct : insertProduct} className="needs-validation" noValidate>
        <div className="modal-body">
          <Alert alert={alert} />

          <TextField
            required
            label={'Nome'}
            name="nome"
            onChange={handleChange}
            value={product.nome}
          />

          <TextField
            required
            label={'Preço unitário'}
            name="preco"
            onChange={handleChange}
            value={product.preco}
          />

          <TextField
            required
            label={'CFOP'}
            name="cfop"
            onChange={handleChange}
            value={product.cfop}
          />

          <TextField
            required
            label={'Quantidade'}
            name="qtde"
            onChange={handleChange}
            value={product.qtde}
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