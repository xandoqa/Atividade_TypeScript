import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Categoria } from "./Categoria"; // ✅ Import relativo

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  descricao!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  preco!: number;

  @Column()
  quantidade!: number;

  @CreateDateColumn()
  dataCriacao!: Date;

  @UpdateDateColumn()
  dataAtualizacao!: Date;

  @ManyToOne(() => Categoria, categoria => categoria.produtos, {
    onDelete: "RESTRICT",
  })
  categoria!: Categoria;
}