import readline from 'readline';
import { Inventario } from '../classes/Inventario';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export function exibirMenu(inventario: Inventario): void {
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
            exibirMenu(inventario);
          });
        });
        break;
      case "2":
        inventario.listarCategorias();
        exibirMenu(inventario);
        break;
      case "3":
        rl.question("Nome do produto: ", nome => {
          rl.question("Descrição do produto: ", descricao => {
            rl.question("Preço do produto (ex: 10.99): ", preco => {
              if (isNaN(parseFloat(preco))) {
                console.log("Preço inválido. Tente novamente.");
                return exibirMenu(inventario);
              }
              rl.question("Quantidade (ex: 5): ", quantidade => {
                if (isNaN(parseInt(quantidade))) {
                  console.log("Quantidade inválida. Tente novamente.");
                  return exibirMenu(inventario);
                }
                rl.question("ID da Categoria: ", categoriaId => {
                  inventario.adicionarProduto(
                    nome.trim(),
                    descricao.trim(),
                    parseFloat(preco.trim()),
                    parseInt(quantidade.trim()),
                    categoriaId.trim()
                  );
                  exibirMenu(inventario);
                });
              });
            });
          });
        });
        break;
      case "4":
        inventario.listarProdutos();
        exibirMenu(inventario);
        break;
      case "5":
        console.log("Saindo...");
        rl.close();
        break;
      default:
        console.log("Opção inválida! Por favor, escolha entre 1 e 5.");
        exibirMenu(inventario);
    }
  });
}