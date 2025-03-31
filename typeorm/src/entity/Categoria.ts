import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Produto } from "./Produto";

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    dataCriacao: Date;

    @OneToMany(() => Produto, (produto) => produto.categoria)
    produtos: Produto[];
}