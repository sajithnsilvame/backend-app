import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({"type":"text"})
    description!: string;

    @Column()
    price!: number;

    @Column()
    stock!: number;

    @Column()
    category!: string;
}
