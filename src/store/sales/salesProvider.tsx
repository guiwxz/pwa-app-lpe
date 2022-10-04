import React from 'react';
import { AlertType, ResponseType } from '../types';
import { SalesType, SalesContextSchema } from './sales.types';

export const SalesContext = React.createContext<SalesContextSchema>(
  {} as SalesContextSchema
);


const SalesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

  const [alert, setAlert] = React.useState<AlertType>({ status: '', message: '' });
  const [salesList, setSalesList] = React.useState<SalesType[]>([]);
  const [editar, setEditar] = React.useState(false);
  const [sale, setSale] = React.useState<SalesType>({ 
    codigo: 0,
    descricao: '',
    produto: '',
    qtde_venda: 0,
    valor: 0,
    valor_total: 0,  
    codigo_produto: 0,
  })

  
  const fetchSales = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/sales`)
      .then(response => response.json())
      .then(({ data }: ResponseType<SalesType[]>) => setSalesList(data))
      .catch(err => setAlert({ status: "", message: err }))

  }

  const fetchSale = async (codigo: number) => {
    await fetch(`${process.env.REACT_APP_API_URL}/sales/${codigo}`)
      .then(response => response.json())
      .then(({ data }: ResponseType<SalesType>) => setSale({
        ...data, 
        //desconto: Number((100 - ((data?.valor_total / data?.valor) * 100)).toPrecision(2))
      }))
      .catch(err => setAlert({ status: "", message: err }))
  }

  const insertSale = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(sale);
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/sales`,
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sale)
        }
      )
      .then(response => response.json())
      .then(json => {
        setAlert({
          status: json.status,
          message: json.message
        })
        setSale(json.data);
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

    fetchSales();
  }

  const updateSale = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(sale);
    
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/sales/${sale.codigo}`,
        {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sale)
        }
      )
      .then(response => response.json())
      .then(json => {
        setAlert({
          status: json.status,
          message: json.message
        })
        setSale(json.data);
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

    fetchSales();
  }
  //React.ChangeEvent<HTMLInputElement>
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setSale(current => ({
      ...current,
      [name]: value
    }))
  }

  const deleteSale = async (codigo: number) => {
    if (window.confirm('Deseja remover este objeto?')) {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/sales/${codigo}`,
          { method: "DELETE" })
          .then(response => response.json())
          .then(json => setAlert({ status: json.status, message: json.message }))
          fetchSales();
      } catch (err) {
        console.log('Erro: ' + err)
        setAlert({ status: 'erro', message: err as string })
      }
    }
  }


  React.useEffect(() => {
    fetchSales();
  }, []);

  return (
    <SalesContext.Provider value={{
      salesList,
      sale,
      setSale,
      deleteSale,
      insertSale,
      updateSale,
      fetchSale,
      fetchSales,
      handleChange,
      alert,
      setAlert
    }}>
      {children}
    </SalesContext.Provider>

  )

}

export default SalesProvider;