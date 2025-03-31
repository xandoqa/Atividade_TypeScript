import { AppDataSource } from "../database/data-source";
import { Produto } from "../entity/Produto";
import { Categoria } from "../entity/Categoria";

const produtoRepo = AppDataSource.getRepository(Produto);
const categoriaRepo = AppDataSource.getRepository(Categoria);

export class ProdutoController {
    static async criar(nome: string, descricao: string, preco: number, quantidade: number, categoriaId: string) {
        const categoria = await categoriaRepo.findOne({ where: { id: categoriaId } });
        if (!categoria) return console.log("Categoria inválida!");

        const produto = produtoRepo.create({ nome, descricao, preco, quantidade, categoria });
        await produtoRepo.save(produto);
        console.log("Produto criado:", produto);
    }

    static async listar() {
        const produtos = await produtoRepo.find({ relations: ["categoria"] });
        console.table(produtos);
    }

    static async buscarPorNomeOuId(valor: string) {
        const produto = await produtoRepo.findOne({
            where: [{ id: valor }, { nome: valor }],
            relations: ["categoria"]
        });
        console.log(produto || "Produto não encontrado :(");
    }

    static async remover(id: string) {
        const produto = await produtoRepo.findOne({ where: { id } });
        if (!produto) return console.log("Produto não encontrado :(");
        await produtoRepo.remove(produto);
        console.log("Produto removido!");
    }
}