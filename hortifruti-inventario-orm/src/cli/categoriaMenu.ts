import inquirer from "inquirer";
import { AppDataSource } from "../data-source";
import { Categoria } from "../entities/Categoria";
import { Produto } from "../entities/Produto";

export async function categoriaMenu() {
  const categoriaRepo = AppDataSource.getRepository(Categoria);
  const produtoRepo = AppDataSource.getRepository(Produto);

  let voltar = false;

  while (!voltar) {
    const { opcao } = await inquirer.prompt({
      type: "list",
      name: "opcao",
      message: "Menu de Categorias",
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
        const nova = await inquirer.prompt([
          { name: "nome", message: "Nome da categoria:" },
          { name: "descricao", message: "Descrição:" }
        ]);
        const categoria = categoriaRepo.create({ ...nova });
        await categoriaRepo.save(categoria);
        console.log("Categoria criada com sucesso!");
        break;

      case "Listar Categorias":
        const todas = await categoriaRepo.find();
        console.table(todas);
        break;

      case "Buscar Categoria":
        const { termo } = await inquirer.prompt({
          name: "termo",
          message: "Digite o ID ou nome da categoria:"
        });

        const resultados = await categoriaRepo.find({
          where: [
            { id: Number(termo) || 0 },
            { nome: termo }
          ]
        });

        if (resultados.length === 0) {
          console.log("Nenhuma categoria encontrada.");
        } else {
          console.table(resultados);
        }
        break;

      case "Atualizar Categoria":
        const { idAtualizar } = await inquirer.prompt({
          name: "idAtualizar",
          message: "ID da categoria a atualizar:"
        });

        const categoriaAtual = await categoriaRepo.findOneBy({ id: Number(idAtualizar) });

        if (!categoriaAtual) {
          console.log("Categoria não encontrada.");
          break;
        }

        const atualizada = await inquirer.prompt([
          { name: "nome", message: `Nome (${categoriaAtual.nome}):`, default: categoriaAtual.nome },
          { name: "descricao", message: `Descrição (${categoriaAtual.descricao}):`, default: categoriaAtual.descricao }
        ]);

        categoriaRepo.merge(categoriaAtual, atualizada);
        await categoriaRepo.save(categoriaAtual);
        console.log("Categoria atualizada com sucesso!");
        break;

      case "Remover Categoria":
        const { idRemover } = await inquirer.prompt({
          name: "idRemover",
          message: "ID da categoria a remover:"
        });

        const categoriaRemover = await categoriaRepo.findOneBy({ id: Number(idRemover) });

        if (!categoriaRemover) {
          console.log("Categoria não encontrada.");
          break;
        }

        const produtosAssociados = await produtoRepo.find({
          where: { categoria: { id: categoriaRemover.id } },
          relations: ["categoria"]
        });

        if (produtosAssociados.length > 0) {
          console.log("Não é possível remover uma categoria com produtos associados.");
          break;
        }

        await categoriaRepo.remove(categoriaRemover);
        console.log("Categoria removida com sucesso!");
        break;

      case "Voltar":
        voltar = true;
        break;
    }
  }
}