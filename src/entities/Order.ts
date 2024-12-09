import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('order')
export class Order {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    customer_name!: string;

    @Column()
    customer_address!: string;

    @Column()
    customer_mobile!: string;
}
