/**
 * create table produtos (
	codigo serial primary key, 
	nome varchar(40) not null, 
	preco float not null, 
	cfop varchar(4) not null,
  qtde float not null default 0
);

insert into produtos (nome, preco, cfop, qtde) 
values ('Gasolina Comum', 5.0, '5656', 5000), ('Diesel BS500', 6.33, '5656', 5000)
returning nome, preco, cfop, qtde;


create table vendas (
	codigo serial primary key, 
	descricao varchar(40) not null, 
	qtdeVenda float not null, 
  valor float not null,
  valorTotal float not null,
  data_inc TIMESTAMP,
	produto integer not null, 

	foreign key (produto) references produtos (codigo)
);
 */

import React from "react";
import { AlertType } from "../types";


export type SalesType = {
  codigo: number;
  descricao: string;
  qtde_venda: number;
  valor: number;
  valor_total: number;
  data_inc?: string;
  produto: string;
  codigo_produto: number;
  desconto?: number
}

export type SalesContextSchema = {
  salesList: SalesType[];
  fetchSales: () => void;
  insertSale: (e: React.FormEvent) => void;
  updateSale: (e: React.FormEvent) => void;
  deleteSale: (codigo: number) => void;
  fetchSale: (codigo: number) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  sale: SalesType;
  setSale: React.Dispatch<React.SetStateAction<SalesType>>;

  alert: AlertType;
  setAlert: React.Dispatch<React.SetStateAction<AlertType>>
}