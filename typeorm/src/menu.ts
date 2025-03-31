import readline from "readline";
import { CategoriaController } from "./controllers/CategoriaController";
import { ProdutoController } from "./controllers/ProdutoController";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function exibirMenu() {
    console.log("\n=== Gerenciamento de Inventário ===");
    console.log("1 - Criar Categoria");
    console.log("2 - Listar Categorias");
    console.log("3 - Criar Produto");
    console.log("4 - Listar Produtos");
    console.log("5 - Sair");

    rl.question("Escolha uma opção: ", async (opcao) => {
        switch (opcao.trim()) {
            case "1":
                rl.question("Nome da categoria: ", (nome) => {
                    rl.question("Descrição: ", async (descricao) => {
                        await CategoriaController.criar(nome.trim(), descricao.trim());
                        exibirMenu();
                    });
                });
                break;
            case "2":
                await CategoriaController.listar();
                exibirMenu();
                break;
            case "3":
                rl.question("Nome do produto: ", (nome) => {
                    rl.question("Descrição: ", (descricao) => {
                        rl.question("Preço: ", (preco) => {
                            rl.question("Quantidade: ", (quantidade) => {
                                rl.question("ID da Categoria: ", async (categoriaId) => {
                                    await ProdutoController.criar(nome, descricao, parseFloat(preco), parseInt(quantidade), categoriaId);
                                    exibirMenu();
                                });
                            });
                        });
                    });
                });
                break;
            case "4":
                await ProdutoController.listar();
                exibirMenu();
                break;
            case "5":
                console.log("Saindo...");
                rl.close();
                break;
            default:
                console.log("Opção inválida!");
                exibirMenu();
        }
    });
}

export { exibirMenu };