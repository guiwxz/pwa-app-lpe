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

export type ProductType = {
  codigo: number;
  nome: string;
  preco: number;
  cfop: string;
  qtde: number;
}

export type ProductsContextSchema = {
  productsList: ProductType[];
  fetchProducts: () => void;
  insertProduct: (e: React.FormEvent) => void;
  updateProduct: (e: React.FormEvent) => void;
  deleteProduct: (codigo: number) => void;
  fetchProduct: (codigo: number) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  product: ProductType;
  setProduct: React.Dispatch<React.SetStateAction<ProductType>>;

  alert: AlertType;
  setAlert: React.Dispatch<React.SetStateAction<AlertType>>
}
