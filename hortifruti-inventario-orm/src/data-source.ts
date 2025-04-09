import "reflect-metadata";
import { DataSource } from "typeorm";
import { Categoria } from "./entities/Categoria";
import { Produto } from "./entities/Produto";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "hortifruti.sqlite",
  synchronize: true,
  logging: false,
  entities: ["src/entities/*.ts"],
  migrations: [],
  subscribers: [],
});