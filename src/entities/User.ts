import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;  // Use `!` to tell TypeScript this will be initialized by TypeORM

  @Column()
  name!: string;

  @Column()
  email!: string;
}
