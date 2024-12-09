import { AppDataSource } from "../config/database";
import { Seeder } from "./Seeder";

export const seeders = {} as { 
    [key: string]: new () => Seeder & { new(): Seeder } 
};

const runSpecificSeeder = async (seederName: string) => {
    if (!seeders[seederName]) {
        console.error(`Seeder '${seederName}' not found. Available seeders: ${Object.keys(seeders).join(", ")}`);
        process.exit(1);
    }

    try {
        await AppDataSource.initialize();
        console.log(`Running ${seederName} seeder...`);
        
        const SeederClass = seeders[seederName];
        const seeder = new SeederClass();
        await seeder.run();

        console.log(`${seederName} seeder completed successfully`);
        process.exit(0);
    } catch (error) {
        console.error(`Error running ${seederName} seeder:`, error);
        process.exit(1);
    }
};

const runAllSeeders = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Running all seeders...");

        for (const [name, SeederClass] of Object.entries(seeders)) {
            console.log(`Running ${name} seeder...`);
            const seeder = new SeederClass();
            await seeder.run();
            console.log(`${name} seeder completed`);
        }

        console.log("All database seeding completed successfully");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

const seederName = process.argv[2];
if (seederName) {
    runSpecificSeeder(seederName);
} else {
    runAllSeeders();
}
