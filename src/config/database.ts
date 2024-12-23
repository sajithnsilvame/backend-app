import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + "/../entities/*.ts"],
    migrations: ["src/migrations/*.ts"],
    migrationsTableName: "migrations_history",
    synchronize: false,
    migrationsRun: true,
    logging: true,
    migrationsTransactionMode: "none",
});
