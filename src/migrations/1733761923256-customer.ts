import { MigrationInterface, QueryRunner } from "typeorm";

export class Customer1733761923256 implements MigrationInterface {
    name = 'Customer1733761923256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE IF NOT EXISTS `customer` (`id` int NOT NULL AUTO_INCREMENT PRIMARY KEY, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `product_qty` varchar(255) NOT NULL, `total_amount` varchar(255) NOT NULL) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE IF EXISTS `customer`");
    }
}