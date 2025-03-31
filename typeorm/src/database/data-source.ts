import "reflect-metadata";
import { DataSource } from "typeorm";
import { Categoria } from "../entity/Categoria";
import { Produto } from "../entity/Produto";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "senha",
    database: "inventario",
    synchronize: true,
    logging: false,
    entities: [Categoria, Produto],
});