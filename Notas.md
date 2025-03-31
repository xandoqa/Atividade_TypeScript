Integrantes do grupo:
Ester Yasmin Santos Silva
André Luiz Borges Aguiar
Artur Braz Lopes
Caio Murilo Silva de Oliveira
Alexandre Rodrigues Costa

Sistema de Gerenciamento de Inventário é uma aplicação desenvolvida em TypeScript para facilitar o gerenciamento de categorias e produtos via terminal. Entre as principais funcionalidades estão criar, listar, atualizar e excluir categorias, desde que sem produtos associados, além de adicionar e listar produtos com informações como nome, descrição, preço, quantidade, categoria vinculada e datas de criação e atualização. A interface é interativa e amigável, permitindo navegação simples pelo terminal. A estrutura de dados utiliza uma interface chamada Categoria que contém id, nome, descrição e data de criação.

Código: 

interface Categoria {
  id: string;
  nome: string;
  descricao: string;
  dataCriacao: Date;
}
