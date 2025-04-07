import { ProdutoService } from "C:/Users/ester.yasmin/Downloads/hortifruti-inventario/src/cli/services/ProdutoService";

interface Categoria {
  id: string;
  nome: string;
  descricao: string;
  dataCriacao: Date;
}

export class CategoriaService {
  private categorias: Categoria[] = [];

  criarCategoria(nome: string, descricao: string): void {
    const novaCategoria: Categoria = {
      id: (Math.random() * 100000).toFixed(0),
      nome,
      descricao,
      dataCriacao: new Date()
    };
    this.categorias.push(novaCategoria);
    console.log("\n Categoria criada com sucesso!");
  }

  listarCategorias(): void {
    if (this.categorias.length === 0) {
      console.log("\n Nenhuma categoria cadastrada.");
    } else {
      console.table(this.categorias);
    }
  }

  buscarCategoria(termo: string): void {
    const resultado = this.categorias.find(
      c => c.id === termo || c.nome.toLowerCase().includes(termo.toLowerCase())
    );
    if (resultado) {
      console.table([resultado]);
    } else {
      console.log("\n Categoria não encontrada.");
    }
  }

  atualizarCategoria(id: string, novoNome: string, novaDescricao: string): void {
    const categoria = this.categorias.find(c => c.id === id);
    if (!categoria) {
      console.log("\n Categoria não encontrada.");
      return;
    }
    categoria.nome = novoNome;
    categoria.descricao = novaDescricao;
    console.log("\n Categoria atualizada com sucesso!");
  }

  removerCategoria(id: string, produtoService: ProdutoService): void {
    const possuiProdutos = produtoService.temProdutosNaCategoria(id);
    if (possuiProdutos) {
      console.log("\n Não é possível remover a categoria com produtos vinculados.");
      return;
    }

    const index = this.categorias.findIndex(c => c.id === id);
    if (index >= 0) {
      this.categorias.splice(index, 1);
      console.log("\n Categoria removida com sucesso!");
    } else {
      console.log("\n Categoria não encontrada.");
    }
  }

  getCategorias() {
    return this.categorias;
  }
}