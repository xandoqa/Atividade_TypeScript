import { AppDataSource } from "../database/data-source";
import { Categoria } from "../entity/Categoria";

const categoriaRepo = AppDataSource.getRepository(Categoria);

export class CategoriaController {
    static async criar(nome: string, descricao: string) {
        const categoria = categoriaRepo.create({ nome, descricao });
        await categoriaRepo.save(categoria);
        console.log("Categoria criada:", categoria);
    }

    static async listar() {
        const categorias = await categoriaRepo.find({ relations: ["produtos"] });
        console.table(categorias);
    }

    static async buscarPorNomeOuId(valor: string) {
        const categoria = await categoriaRepo.findOne({
            where: [{ id: valor }, { nome: valor }],
            relations: ["produtos"]
        });
        console.log(categoria || "Categoria não encontrada :(");
    }

    static async remover(id: string) {
        const categoria = await categoriaRepo.findOne({ where: { id }, relations: ["produtos"] });
        if (!categoria) return console.log("Categoria não encontrada :(");
        if (categoria.produtos.length > 0) return console.log("Não é possível remover, pois possui produtos!");
        await categoriaRepo.remove(categoria);
        console.log("Categoria removida com sucesso!");
    }
}
