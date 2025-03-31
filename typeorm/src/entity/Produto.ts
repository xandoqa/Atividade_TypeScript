import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Categoria } from "./Categoria";

@Entity()
export class Produto {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column("decimal")
    preco: number;

    @Column("int")
    quantidade: number;

    @ManyToOne(() => Categoria, (categoria) => categoria.produtos, { onDelete: "CASCADE" })
    categoria: Categoria;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    dataCriacao: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    dataAtualizacao: Date;
}