import inquirer from "inquirer";
import { CategoriaService } from "C:/Users/ester.yasmin/Downloads/hortifruti-inventario/src/cli/services/CategoriaService";
import { ProdutoService } from "C:/Users/ester.yasmin/Downloads/hortifruti-inventario/src/cli/services/ProdutoService";
import { categoriaMenu } from "C:/Users/ester.yasmin/Downloads/hortifruti-inventario/src/cli/categoriaMenu";
import { menuProduto } from "C:/Users/ester.yasmin/Downloads/hortifruti-inventario/src/cli/produtoMenu";


const categoriaService = new CategoriaService();
const produtoService = new ProdutoService();

async function menuPrincipal() {
  let sair = false;
  while (!sair) {
    const { opcao } = await inquirer.prompt({
      type: "list",
      name: "opcao",
      message: "\n Sistema de Inventário Hortifruti",
      choices: ["Gerenciar Categorias", "Gerenciar Produtos", "Sair"]
    });
    switch (opcao) {
      case "Gerenciar Categorias":
        await categoriaMenu(categoriaService, produtoService);
        break;
      case "Gerenciar Produtos":
        await menuProduto(produtoService, categoriaService);
        break;
      case "Sair":
        sair = true;
        console.log("\n Saindo... Até logo!");
        break;
    }
  }
}

menuPrincipal();
