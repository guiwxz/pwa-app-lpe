import React from 'react';
import { AlertType, ResponseType } from '../types';
import { ProductType, ProductsContextSchema } from './products.types';

export const ProductsContext = React.createContext<ProductsContextSchema>(
  {} as ProductsContextSchema
);


const ProductsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

  const [alert, setAlert] = React.useState<AlertType>({ status: '', message: '' });
  const [productsList, setProductsList] = React.useState<ProductType[]>([]);
  const [editar, setEditar] = React.useState(false);
  const [product, setProduct] = React.useState<ProductType>({ codigo: 0, nome: "", cfop: '', preco: 0, qtde: 0 })

  

  const fetchProducts = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then(response => response.json())
      .then(({ data }: ResponseType<ProductType[]>) => setProductsList(data))
      .catch(err => setAlert({ status: "", message: err }))

  }

  const fetchProduct = async (codigo: number) => {
    await fetch(`${process.env.REACT_APP_API_URL}/products/${codigo}`)
      .then(response => response.json())
      .then(({ data }: ResponseType<ProductType>) => setProduct(data))
      .catch(err => setAlert({ status: "", message: err }))
  }

  const insertProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/products`,
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product)
        }
      )
      .then(response => response.json())
      .then(json => {
        setAlert({
          status: json.status,
          message: json.message
        })
        setProduct(json.data);
        if (!editar) {
          setEditar(true);
        }
      })

    } catch(err: any) {
      setAlert({
        status: "error",
        message: err
      })
    }

    fetchProducts();
  }

  const updateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/products/${product.codigo}`,
        {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product)
        }
      )
      .then(response => response.json())
      .then(json => {
        setAlert({
          status: json.status,
          message: json.message
        })
        setProduct(json.data);
        if (!editar) {
          setEditar(true);
        }
      })

    } catch(err: any) {
      setAlert({
        status: "error",
        message: err
      })
    }

    fetchProducts();
  }
  //React.ChangeEvent<HTMLInputElement>
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setProduct(current => ({
      ...current,
      [name]: value
    }))
  }

  const deleteProduct = async (codigo: number) => {
    if (window.confirm('Deseja remover este produto?')) {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/products/${codigo}`,
            { method: "DELETE" })
            .then(response => response.json())
            .then(json => setAlert({ 
              status: json.status, 
              message: String(json.message).split(' ').includes('violates')
                ? 'Erro ao remover produto: este produto está vinculado a alguma venda'
                : json.message 
            }))
            
            fetchProducts();
      } catch (err) {
        console.log('Erro: ' + err);
        
      }
    }
  }

  React.useEffect(() => {
    fetchProducts();

  }, []);

  return (
    <ProductsContext.Provider value={{
      productsList,
      fetchProducts,
      insertProduct,
      deleteProduct,
      fetchProduct,
      updateProduct,
      handleChange,
      product,
      setProduct,
      alert,
      setAlert
    }}>
      {children}
    </ProductsContext.Provider>

  )

}

export default ProductsProvider;