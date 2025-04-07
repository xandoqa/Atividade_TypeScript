import inquirer from "inquirer";
import { ProdutoService } from "C:/Users/ester.yasmin/Downloads/hortifruti-inventario/src/cli/services/ProdutoService";
import { CategoriaService } from "C:/Users/ester.yasmin/Downloads/hortifruti-inventario/src/cli/services/CategoriaService";

export async function menuProduto(produtoService: ProdutoService, categoriaService: CategoriaService) {
  let continuar = true;

  while (continuar) {
    console.log("\n=== MENU DE PRODUTOS ===");

    const { opcao } = await inquirer.prompt([
      {
        type: "list",
        name: "opcao",
        message: "Escolha uma opção:",
        choices: [
          "Criar produto",
          "Listar produtos",
          "Buscar produto",
          "Atualizar produto",
          "Remover produto",
          "Voltar"
        ]
      }
    ]);

    switch (opcao) {
      case "Criar produto":
        // Listar categorias disponíveis para seleção
        const categorias = categoriaService.getCategorias();
        if (categorias.length === 0) {
          console.log("\n Não há categorias cadastradas. Crie uma categoria primeiro.");
          break;
        }

        const escolhaCategoria = await inquirer.prompt([
          {
            type: "list",
            name: "categoriaId",
            message: "Escolha a categoria:",
            choices: categorias.map(c => ({ name: c.nome, value: c.id }))
          }
        ]);

        const dadosProduto = await inquirer.prompt([
          { name: "nome", message: "Nome do produto:" },
          { name: "descricao", message: "Descrição:" },
          {
            name: "preco",
            message: "Preço:",
            validate: (v: string) => !isNaN(Number(v)) ? true : "Por favor, digite um número válido."
          },
          {
            name: "quantidade",
            message: "Quantidade:",
            validate: (v: string) => !isNaN(Number(v)) ? true : "Por favor, digite um número válido."
          }
        ]);

        produtoService.criarProduto({ ...dadosProduto, ...escolhaCategoria });
        break;

      case "Listar produtos":
        produtoService.listarProdutos();
        break;

      case "Buscar produto":
        const { termoBusca } = await inquirer.prompt([
          { name: "termoBusca", message: "Digite o ID, nome ou categoria do produto:" }
        ]);
        produtoService.buscarProduto(termoBusca);
        break;

      case "Atualizar produto":
        const { idAtualizar } = await inquirer.prompt([
          { name: "idAtualizar", message: "Digite o ID do produto a ser atualizado:" }
        ]);

        const novosDados = await inquirer.prompt([
          { name: "nome", message: "Novo nome:" },
          { name: "descricao", message: "Nova descrição:" },
          {
            name: "preco",
            message: "Novo preço:",
            validate: (v: string) => !isNaN(Number(v)) ? true : "Por favor, digite um número válido."
          },
          {
            name: "quantidade",
            message: "Nova quantidade:",
            validate: (v: string) => !isNaN(Number(v)) ? true : "Por favor, digite um número válido."
          }
        ]);

        produtoService.atualizarProduto(idAtualizar, novosDados);
        break;

      case "Remover produto":
        const { idRemover } = await inquirer.prompt([
          { name: "idRemover", message: "Digite o ID do produto a ser removido:" }
        ]);
        produtoService.removerProduto(idRemover);
        break;

      case "Voltar":
        continuar = false;
        break;
    }
  }
}