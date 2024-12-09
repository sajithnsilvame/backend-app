import { MigrationInterface, QueryRunner } from "typeorm";

export class Product1733752469275 implements MigrationInterface {
    name = 'Product1733752469275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE IF NOT EXISTS `product` (`id` int NOT NULL AUTO_INCREMENT PRIMARY KEY, `name` varchar(255) NOT NULL, `description` text NOT NULL, `price` varchar(255) NOT NULL, `stock` varchar(255) NOT NULL, `category` varchar(255) NOT NULL) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE IF EXISTS `product`");
    }
}