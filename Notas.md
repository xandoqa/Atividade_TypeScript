Integrantes do grupo:
Ester Yasmin Santos Silva
André Luiz Borges Aguiar
Artur Braz Lopes
Caio Murilo Silva de Oliveira
Alexandre Rodrigues Costa

Sistema de Gerenciamento de Inventário é uma aplicação desenvolvida em TypeScript para gerenciar categorias e produtos de forma prática via terminal. Ele utiliza modularização, boas práticas de programação orientada a objetos e persistência em memória, garantindo um código limpo, escalável e eficiente. Entre suas funcionalidades estão a criação, listagem, atualização e exclusão de categorias, desde que não possuam produtos associados. Também permite adicionar e listar produtos com informações como nome, descrição, preço, quantidade, categoria vinculada e datas de criação/atualização. A interface interativa no terminal facilita a navegação. As estruturas de dados incluem as interfaces Categoria e Produto, definidas abaixo:

interface Categoria {
  id: string;          // Identificador único da categoria
  nome: string;        // Nome da categoria
  descricao: string;   // Breve descrição
  dataCriacao: Date;   // Data de criação da categoria
}

interface Produto {
  id: string;            // Identificador único do produto
  nome: string;          // Nome do produto
  descricao: string;     // Descrição detalhada
  preco: number;         // Preço do produto
  quantidade: number;    // Quantidade disponível no estoque
  categoriaId: string;   // ID da categoria associada
  dataCriacao: Date;     // Data de criação do produto
  dataAtualizacao: Date; // Data de última atualização
}


import readline from 'readline';
import { v4 as uuidv4 } from 'uuid';

interface Categoria {
  id: string;
  nome: string;
  descricao: string;
  dataCriacao: Date;
}

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

class Inventario {
  private categorias: Categoria[] = [];
  private produtos: Produto[] = [];

  adicionarCategoria(nome: string, descricao: string): void {
    const novaCategoria: Categoria = {
      id: uuidv4(),
      nome,
      descricao,
      dataCriacao: new Date(),
    };
    this.categorias.push(novaCategoria);
    console.log("Categoria adicionada com sucesso!");
  }

  listarCategorias(): void {
    console.table(this.categorias);
  }

  buscarCategoria(termo: string): Categoria | undefined {
    return this.categorias.find(cat => cat.id === termo || cat.nome.toLowerCase() === termo.toLowerCase());
  }

  atualizarCategoria(id: string, nome?: string, descricao?: string): void {
    const categoria = this.buscarCategoria(id);
    if (categoria) {
      if (nome) categoria.nome = nome;
      if (descricao) categoria.descricao = descricao;
      console.log("Categoria atualizada!");
    } else {
      console.log("Categoria não encontrada!");
    }
  }

  removerCategoria(id: string): void {
    if (this.produtos.some(prod => prod.categoriaId === id)) {
      console.log("Não é possível remover uma categoria com produtos associados!");
      return;
    }
    this.categorias = this.categorias.filter(cat => cat.id !== id);
    console.log("Categoria removida com sucesso!");
  }

  adicionarProduto(nome: string, descricao: string, preco: number, quantidade: number, categoriaId: string): void {
    if (!this.buscarCategoria(categoriaId)) {
      console.log("Categoria não encontrada!");
      return;
    }
    if (isNaN(preco) || isNaN(quantidade) || preco <= 0 || quantidade < 0) {
      console.log("Preço e quantidade devem ser valores positivos e válidos!");
      return;
    }
    const novoProduto: Produto = {
      id: uuidv4(),
      nome,
      descricao,
      preco,
      quantidade,
      categoriaId,
      dataCriacao: new Date(),
      dataAtualizacao: new Date(),
    };
    this.produtos.push(novoProduto);
    console.log("Produto adicionado com sucesso!");
  }

  listarProdutos(): void {
    console.table(this.produtos);
  }
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const inventario = new Inventario();

function exibirMenu(): void {
  console.log("\nGerenciamento de Inventário");
  console.log("1 - Criar Categoria");
  console.log("2 - Listar Categorias");
  console.log("3 - Criar Produto");
  console.log("4 - Listar Produtos");
  console.log("5 - Sair");
  rl.question("Escolha uma opção: ", opcao => {
    switch (opcao.trim()) {
      case "1":
        rl.question("Nome da categoria: ", nome => {
          rl.question("Descrição da categoria: ", descricao => {
            inventario.adicionarCategoria(nome.trim(), descricao.trim());
            exibirMenu();
          });
        });
        break;
      case "2":
        inventario.listarCategorias();
        exibirMenu();
        break;
      case "3":
        rl.question("Nome do produto: ", nome => {
          rl.question("Descrição do produto: ", descricao => {
            rl.question("Preço do produto: ", preco => {
              rl.question("Quantidade: ", quantidade => {
                rl.question("ID da Categoria: ", categoriaId => {
                  inventario.adicionarProduto(
                    nome.trim(),
                    descricao.trim(),
                    parseFloat(preco.trim()),
                    parseInt(quantidade.trim()),
                    categoriaId.trim()
                  );
                  exibirMenu();
                });
              });
            });
          });
        });
        break;
      case "4":
        inventario.listarProdutos();
        exibirMenu();
        break;
      case "5":
        console.log("Saindo...");
        rl.close();
        break;
      default:
        console.log("Opção inválida!");
        exibirMenu();
    }
  });
}

exibirMenu();


function exibirMenu(): void {
    console.log("\n=== Gerenciamento de Inventário ===");
    console.log("1 - Criar Categoria");
    console.log("2 - Listar Categorias");
    console.log("3 - Criar Produto");
    console.log("4 - Listar Produtos");
    console.log("5 - Sair");
    console.log("===============================");
    rl.question("Escolha uma opção (1-5): ", opcao => {
      switch (opcao.trim()) {
        case "1":
          rl.question("Nome da categoria: ", nome => {
            rl.question("Descrição da categoria: ", descricao => {
              inventario.adicionarCategoria(nome.trim(), descricao.trim());
              exibirMenu();
            });
          });
          break;
        case "2":
          inventario.listarCategorias();
          exibirMenu();
          break;
        case "3":
          rl.question("Nome do produto: ", nome => {
            rl.question("Descrição do produto: ", descricao => {
              rl.question("Preço do produto (ex: 10.99): ", preco => {
                if (isNaN(parseFloat(preco))) {
                  console.log("Preço inválido. Tente novamente.");
                  return exibirMenu();
                }
                rl.question("Quantidade (ex: 5): ", quantidade => {
                  if (isNaN(parseInt(quantidade))) {
                    console.log("Quantidade inválida. Tente novamente.");
                    return exibirMenu();
                  }
                  rl.question("ID da Categoria: ", categoriaId => {
                    inventario.adicionarProduto(
                      nome.trim(),
                      descricao.trim(),
                      parseFloat(preco.trim()),
                      parseInt(quantidade.trim()),
                      categoriaId.trim()
                    );
                    exibirMenu();
                  });
                });
              });
            });
          });
          break;
        case "4":
          inventario.listarProdutos();
          exibirMenu();
          break;
        case "5":
          console.log("Saindo...");
          rl.close();
          break;
        default:
          console.log("Opção inválida! Por favor, escolha entre 1 e 5.");
          exibirMenu();
      }
    });
  }
