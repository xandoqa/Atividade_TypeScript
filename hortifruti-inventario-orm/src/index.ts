import { AppDataSource } from "./data-source";
import inquirer from "inquirer";
import { categoriaMenu } from "./cli/categoriaMenu";
import { produtoMenu } from "./cli/produtoMenu";

AppDataSource.initialize().then(async () => {
  let sair = false;

  while (!sair) {
    const { opcao } = await inquirer.prompt({
      type: "list",
      name: "opcao",
      message: "Hortifruti Inventário com Banco de Dados",
      choices: [
        "Gerenciar Categorias",
        "Gerenciar Produtos",
        "Sair"
      ]
    });

    switch (opcao) {
      case "Gerenciar Categorias":
        await categoriaMenu();
        break;
      case "Gerenciar Produtos":
        await produtoMenu();
        break;
      case "Sair":
        sair = true;
        console.log("Sistema finalizado... Até logo!");
        break;
    }
  }
}).catch((error: any) => console.log("Erro ao conectar com o banco de dados:", error));