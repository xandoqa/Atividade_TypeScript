import { Categoria } from './Categoria';
import { Produto } from './Produto';

export class Inventario {
  private categorias: Categoria[] = [];
  private produtos: Produto[] = [];

  adicionarCategoria(nome: string, descricao: string): void {
    const categoria = new Categoria(nome, descricao);
    this.categorias.push(categoria);
    console.log(`Categoria ${categoria.nome} criada com sucesso! :)`);
  }

  listarCategorias(): void {
    console.log("\nCategorias cadastradas:");
    this.categorias.forEach(categoria => {
      console.log(`ID: ${categoria.id}, Nome: ${categoria.nome}, Descrição: ${categoria.descricao}`);
    });
  }

  buscarCategoria(idOuNome: string): Categoria | undefined {
    return this.categorias.find(c => c.id === idOuNome || c.nome.toLowerCase() === idOuNome.toLowerCase());
  }

  atualizarCategoria(id: string, novoNome: string, novaDescricao: string): void {
    const categoria = this.buscarCategoria(id);
    if (categoria) {
      categoria.nome = novoNome;
      categoria.descricao = novaDescricao;
      console.log(`Categoria ${categoria.id} atualizada com sucesso! :)`);
    } else {
      console.log("Categoria não encontrada :(");
    }
  }

  removerCategoria(id: string): void {
    const categoriaIndex = this.categorias.findIndex(c => c.id === id);
    if (categoriaIndex !== -1) {
      this.categorias.splice(categoriaIndex, 1);
      console.log("Categoria removida com sucesso!");
    } else {
      console.log("Categoria não encontrada :(");
    }
  }

  adicionarProduto(nome: string, descricao: string, preco: number, quantidade: number, categoriaId: string): void {
    const categoria = this.buscarCategoria(categoriaId);
    if (!categoria) {
      console.log("Categoria não encontrada :(");
      return;
    }
    const produto = new Produto(nome, descricao, preco, quantidade, categoriaId);
    this.produtos.push(produto);
    console.log(`Produto ${produto.nome} criado com sucesso! :)`);
  }

  listarProdutos(): void {
    console.log("\nProdutos cadastrados:");
    this.produtos.forEach(produto => {
      console.log(`ID: ${produto.id}, Nome: ${produto.nome}, Categoria: ${produto.categoriaId}, Preço: ${produto.preco}, Quantidade: ${produto.quantidade}`);
    });
  }
}
