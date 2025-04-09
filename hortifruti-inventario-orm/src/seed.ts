import { AppDataSource } from "c:/Users/Yasmin/Downloads/hortifruti-inventario-orm/src/data-source";
import { Categoria } from "./entities/Categoria";
import { Produto } from "./entities/Produto";

async function seed() {
  await AppDataSource.initialize();

  const categoriaRepo = AppDataSource.getRepository(Categoria);
  const produtoRepo = AppDataSource.getRepository(Produto);

  const frutas = categoriaRepo.create({
    nome: "Frutas",
    descricao: "Frutas frescas e naturais"
  });

  const verduras = categoriaRepo.create({
    nome: "Verduras",
    descricao: "Verduras e folhas verdes"
  });

  await categoriaRepo.save([frutas, verduras]);

  const banana = produtoRepo.create({
    nome: "Banana",
    descricao: "Banana prata",
    preco: 4.99,
    quantidade: 50,
    categoria: frutas,
    dataCriacao: new Date(),
    dataAtualizacao: new Date()
  });

  const alface = produtoRepo.create({
    nome: "Alface",
    descricao: "Alface americana",
    preco: 2.49,
    quantidade: 30,
    categoria: verduras,
    dataCriacao: new Date(),
    dataAtualizacao: new Date()
  });

  await produtoRepo.save([banana, alface]);

  console.log("Dados de exemplo inseridos com sucesso!");
  await AppDataSource.destroy();
}

seed().catch((err) => console.error("Erro ao rodar seed:", err));