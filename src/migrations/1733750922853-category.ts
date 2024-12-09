import { MigrationInterface, QueryRunner } from "typeorm";

export class Category1733750922853 implements MigrationInterface {
    name = 'Category1733750922853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE IF NOT EXISTS `category` (`id` int NOT NULL AUTO_INCREMENT PRIMARY KEY, `name` varchar(255) NOT NULL, `description` text NOT NULL) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE IF EXISTS `category`");
    }
}