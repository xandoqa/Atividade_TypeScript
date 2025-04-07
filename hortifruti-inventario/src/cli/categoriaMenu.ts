import inquirer from "inquirer";
import { CategoriaService } from "C:/Users/ester.yasmin/Downloads/hortifruti-inventario/src/cli/services/CategoriaService";
import { ProdutoService } from "C:/Users/ester.yasmin/Downloads/hortifruti-inventario/src/cli/services/ProdutoService";

export async function categoriaMenu(categoriaService: CategoriaService, produtoService: ProdutoService) {
  let voltar = false;

  while (!voltar) {
    const { opcao } = await inquirer.prompt({
      type: "list",
      name: "opcao",
      message: "\n Menu de Categorias",
      choices: [
        "Criar Categoria",
        "Listar Categorias",
        "Buscar Categoria",
        "Atualizar Categoria",
        "Remover Categoria",
        "Voltar"
      ]
    });

    switch (opcao) {
      case "Criar Categoria":
        const novaCategoria = await inquirer.prompt([
          { name: "nome", message: "Nome da categoria:" },
          { name: "descricao", message: "Descrição:" }
        ]);
        categoriaService.criarCategoria(novaCategoria.nome, novaCategoria.descricao);
        break;

      case "Listar Categorias":
        categoriaService.listarCategorias();
        break;

      case "Buscar Categoria":
        const { termoBusca } = await inquirer.prompt({ name: "termoBusca", message: "ID ou Nome da categoria:" });
        categoriaService.buscarCategoria(termoBusca);
        break;

      case "Atualizar Categoria":
        const { idAtualizar } = await inquirer.prompt({ name: "idAtualizar", message: "ID da categoria:" });
        const dadosAtualizados = await inquirer.prompt([
          { name: "nome", message: "Novo nome:" },
          { name: "descricao", message: "Nova descrição:" }
        ]);
        categoriaService.atualizarCategoria(idAtualizar, dadosAtualizados.nome, dadosAtualizados.descricao);
        break;

      case "Remover Categoria":
        const { idRemover } = await inquirer.prompt({ name: "idRemover", message: "ID da categoria a remover:" });
        categoriaService.removerCategoria(idRemover, produtoService);
        break;

      case "Voltar":
        voltar = true;
        break;
    }
  }
}