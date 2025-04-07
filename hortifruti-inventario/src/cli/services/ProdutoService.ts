interface Produto {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    categoriaId: string;
    dataCriacao: Date;
    dataAtualizacao: Date;
  }
  
  export class ProdutoService {
    private produtos: Produto[] = [];
  
    criarProduto(dados: any): void {
      const novoProduto: Produto = {
        id: (Math.random() * 100000).toFixed(0),
        nome: dados.nome,
        descricao: dados.descricao,
        preco: parseFloat(dados.preco),
        quantidade: parseInt(dados.quantidade),
        categoriaId: dados.categoriaId,
        dataCriacao: new Date(),
        dataAtualizacao: new Date()
      };
      this.produtos.push(novoProduto);
      console.log("\n Produto criado com sucesso!");
    }
  
    listarProdutos(): void {
      if (this.produtos.length === 0) {
        console.log("\n Nenhum produto cadastrado.");
      } else {
        console.table(this.produtos);
      }
    }
  
    buscarProduto(termo: string): void {
      const resultado = this.produtos.filter(
        p =>
          p.id === termo ||
          p.nome.toLowerCase().includes(termo.toLowerCase()) ||
          p.categoriaId === termo
      );
      if (resultado.length > 0) {
        console.table(resultado);
      } else {
        console.log("\n Produto não encontrado.");
      }
    }
  
    atualizarProduto(id: string, dados: any): void {
      const produto = this.produtos.find(p => p.id === id);
      if (!produto) {
        console.log("\n Produto não encontrado.");
        return;
      }
  
      produto.nome = dados.nome;
      produto.descricao = dados.descricao;
      produto.preco = parseFloat(dados.preco);
      produto.quantidade = parseInt(dados.quantidade);
      produto.dataAtualizacao = new Date();
  
      console.log("\n Produto atualizado com sucesso!");
    }
  
    removerProduto(id: string): void {
      const index = this.produtos.findIndex(p => p.id === id);
      if (index >= 0) {
        this.produtos.splice(index, 1);
        console.log("\n Produto removido com sucesso!");
      } else {
        console.log("\n Produto não encontrado.");
      }
    }
  
    temProdutosNaCategoria(categoriaId: string): boolean {
      return this.produtos.some(p => p.categoriaId === categoriaId);
    }
  }  