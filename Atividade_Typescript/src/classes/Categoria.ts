import { ICategoria } from '../interfaces/ICategoria';
import { v4 as uuidv4 } from 'uuid';

export class Categoria implements ICategoria {
  id: string;
  nome: string;
  descricao: string;
  dataCriacao: Date;

  constructor(nome: string, descricao: string) {
    this.id = uuidv4();
    this.nome = nome;
    this.descricao = descricao;
    this.dataCriacao = new Date();
  }
}