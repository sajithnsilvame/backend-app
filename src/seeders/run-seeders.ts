import { AppDataSource } from '../config/database';
import { seeders } from './index';

async function runSeeders() {
    try {
        // Initialize the database connection
        await AppDataSource.initialize();

        // Run each seeder sequentially
        for (const seederName in seeders) {
            const SeederClass = seeders[seederName];
            const seeder = new SeederClass();
            await seeder.run();
        }

        console.log('All seeders completed successfully');
    } catch (error) {
        console.error('Error running seeders:', error);
        process.exit(1);
    } finally {
        // Close the database connection
        await AppDataSource.destroy();
    }
}

runSeeders();
