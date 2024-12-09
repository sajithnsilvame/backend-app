import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Category } from "../entities/Category";
import dotenv from "dotenv";
import { Product } from "../entities/Product";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [...require('../entities').entities],
    migrations: ["src/migrations/*.ts"],
    migrationsTableName: "migrations_history",
    synchronize: false,
    migrationsRun: true,
    logging: true,
    migrationsTransactionMode: "none",
});
