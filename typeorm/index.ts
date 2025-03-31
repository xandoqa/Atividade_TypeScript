import { AppDataSource } from "./database/data-source";
import { exibirMenu } from "./menu";

AppDataSource.initialize()
    .then(() => {
        console.log("Banco de dados conectado!");
        exibirMenu();
    })
    .catch((error) => console.log(error));