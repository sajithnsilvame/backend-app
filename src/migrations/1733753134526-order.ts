import { MigrationInterface, QueryRunner } from "typeorm";

export class Order1733753134526 implements MigrationInterface {
    name = 'Order1733753134526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE IF NOT EXISTS `order` (`id` int NOT NULL AUTO_INCREMENT PRIMARY KEY, `customer_name` varchar(255) NOT NULL, `customer` varchar(255) NOT NULL, `customer_mobile` varchar(255) NOT NULL) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE IF EXISTS `order`");
    }
}