import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Produto } from "./Produto";

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  descricao!: string;

  @CreateDateColumn()
  dataCriacao!: Date;

  @OneToMany(() => Produto, produto => produto.categoria)
  produtos!: Produto[];
}