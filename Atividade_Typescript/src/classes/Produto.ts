import { IProduto } from '../interfaces/IProduto';
import { v4 as uuidv4 } from 'uuid';

export class Produto implements IProduto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  categoriaId: string;
  dataCriacao: Date;
  dataAtualizacao: Date;

  constructor(
    nome: string,
    descricao: string,
    preco: number,
    quantidade: number,
    categoriaId: string
  ) {
    this.id = uuidv4();
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.quantidade = quantidade;
    this.categoriaId = categoriaId;
    this.dataCriacao = new Date();
    this.dataAtualizacao = new Date();
  }
}