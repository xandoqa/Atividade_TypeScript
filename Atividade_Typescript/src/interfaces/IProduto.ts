export interface IProduto {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    categoriaId: string;
    dataCriacao: Date;
    dataAtualizacao: Date;
  }  