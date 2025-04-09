import inquirer from "inquirer";
import { AppDataSource } from "../data-source";
import { Produto } from "../entities/Produto";
import { Categoria } from "../entities/Categoria";

const produtoRepo = AppDataSource.getRepository(Produto);
const categoriaRepo = AppDataSource.getRepository(Categoria);

export async function produtoMenu() {
  let sair = false;

  while (!sair) {
    const { opcao } = await inquirer.prompt([
      {
        type: "list",
        name: "opcao",
        message: "Menu de Produtos - Escolha uma opção:",
        choices: [
          "Criar Produto",
          "Listar Produtos",
          "Buscar Produto",
          "Atualizar Produto",
          "Remover Produto",
          "Voltar"
        ]
      }
    ]);

    switch (opcao) {
      case "Criar Produto":
        const categorias: Categoria[] = await categoriaRepo.find();

        if (categorias.length === 0) {
          console.log("Nenhuma categoria disponível... Crie uma antes!");
          break;
        }

        const novoProduto = await inquirer.prompt([
          { name: "nome", message: "Nome do produto:" },
          { name: "descricao", message: "Descrição:" },
          {
            name: "preco",
            message: "Preço:",
            validate: (val: string) => !isNaN(Number(val)) || "Digite um número válido"
          },
          {
            name: "quantidade",
            message: "Quantidade:",
            validate: (val: string) => !isNaN(Number(val)) || "Digite um número válido"
          },
          {
            type: "list",
            name: "categoriaId",
            message: "Escolha a categoria:",
            choices: categorias.map((cat: Categoria) => ({
              name: cat.nome,
              value: cat.id
            }))
          }
        ]);

        const categoriaSelecionada = await categoriaRepo.findOneBy({ id: novoProduto.categoriaId });

        if (!categoriaSelecionada) {
          console.log("Categoria não encontrada. Produto não foi criado...");
          return;
        }

        const produtoCriado = produtoRepo.create({
          nome: novoProduto.nome,
          descricao: novoProduto.descricao,
          preco: Number(novoProduto.preco),
          quantidade: Number(novoProduto.quantidade),
          categoria: categoriaSelecionada,
          dataCriacao: new Date(),
          dataAtualizacao: new Date()
        });

        await produtoRepo.save(produtoCriado);
        console.log("Produto criado com sucesso!");
        break;

      case "Listar Produtos":
        const produtos: Produto[] = await produtoRepo.find({ relations: ["categoria"] });

        if (produtos.length === 0) {
          console.log("Nenhum produto cadastrado...");
        } else {
          console.table(
            produtos.map((p) => ({
              ID: p.id,
              Nome: p.nome,
              Categoria: p.categoria?.nome,
              Preço: `R$ ${p.preco.toFixed(2)}`,
              Quantidade: p.quantidade
            }))
          );
        }
        break;

      case "Buscar Produto":
        const { termoBusca } = await inquirer.prompt({
          name: "termoBusca",
          message: "Digite o nome ou ID do produto:"
        });

        const query = produtoRepo
          .createQueryBuilder("produto")
          .leftJoinAndSelect("produto.categoria", "categoria");

        const isNumero = !isNaN(Number(termoBusca));

        if (isNumero) {
          query.where("produto.nome LIKE :termo OR produto.id = :id", {
            termo: `%${termoBusca}%`,
            id: Number(termoBusca)
          });
        } else {
          query.where("produto.nome LIKE :termo", {
            termo: `%${termoBusca}%`
          });
        }

        const resultado = await query.getMany();

        if (resultado.length === 0) {
          console.log("Produto não encontrado...");
        } else {
          console.table(
            resultado.map((p) => ({
              ID: p.id,
              Nome: p.nome,
              Categoria: p.categoria?.nome,
              Preço: `R$ ${p.preco.toFixed(2)}`,
              Quantidade: p.quantidade
            }))
          );
        }
        break;

      case "Atualizar Produto":
        const todosProdutos: Produto[] = await produtoRepo.find({ relations: ["categoria"] });

        if (todosProdutos.length === 0) {
          console.log("Nenhum produto para atualizar...");
          break;
        }

        const { produtoId } = await inquirer.prompt({
          type: "list",
          name: "produtoId",
          message: "Escolha o produto a atualizar:",
          choices: todosProdutos.map((p) => ({
            name: `${p.nome} (ID: ${p.id})`,
            value: p.id
          }))
        });

        const produtoAtual = await produtoRepo.findOne({
          where: { id: produtoId },
          relations: ["categoria"]
        });

        if (!produtoAtual) {
          console.log("Produto não encontrado...");
          break;
        }

        const categoriasAtualizar: Categoria[] = await categoriaRepo.find();

        const dadosAtualizados = await inquirer.prompt([
          {
            name: "nome",
            message: `Nome (${produtoAtual.nome}):`,
            default: produtoAtual.nome
          },
          {
            name: "descricao",
            message: `Descrição (${produtoAtual.descricao}):`,
            default: produtoAtual.descricao
          },
          {
            name: "preco",
            message: `Preço (${produtoAtual.preco}):`,
            default: produtoAtual.preco.toString(),
            validate: (val: string) => !isNaN(Number(val)) || "Digite um número válido"
          },
          {
            name: "quantidade",
            message: `Quantidade (${produtoAtual.quantidade}):`,
            default: produtoAtual.quantidade.toString(),
            validate: (val: string) => !isNaN(Number(val)) || "Digite um número válido"
          },
          {
            type: "list",
            name: "categoriaId",
            message: "Escolha a nova categoria:",
            choices: categoriasAtualizar.map((cat: Categoria) => ({
              name: cat.nome,
              value: cat.id
            })),
            default: produtoAtual.categoria?.id
          }
        ]);

        const novaCategoria = await categoriaRepo.findOneBy({ id: dadosAtualizados.categoriaId });

        produtoAtual.nome = dadosAtualizados.nome;
        produtoAtual.descricao = dadosAtualizados.descricao;
        produtoAtual.preco = Number(dadosAtualizados.preco);
        produtoAtual.quantidade = Number(dadosAtualizados.quantidade);
        produtoAtual.categoria = novaCategoria!;
        produtoAtual.dataAtualizacao = new Date();

        await produtoRepo.save(produtoAtual);
        console.log("Produto atualizado com sucesso!");
        break;

      case "Remover Produto":
        const produtosRemover: Produto[] = await produtoRepo.find();

        if (produtosRemover.length === 0) {
          console.log("Nenhum produto para remover...");
          break;
        }

        const { removerId } = await inquirer.prompt({
          type: "list",
          name: "removerId",
          message: "Escolha o produto a remover:",
          choices: produtosRemover.map((p) => ({
            name: `${p.nome} (ID: ${p.id})`,
            value: p.id
          }))
        });

        await produtoRepo.delete(removerId);
        console.log("Produto removido com sucesso!");
        break;

      case "Voltar":
        sair = true;
        break;
    }
  }
}