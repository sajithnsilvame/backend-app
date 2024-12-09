import { AppDataSource } from '../config/database';
import * as fs from 'fs';
import * as path from 'path';

async function runSeeder(seederName: string) {
    try {
        // Ensure database connection
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        // Construct the full path to the seeders directory
        const seedersDir = path.join(__dirname, '..', 'seeders');

        // Find the seeder file
        const seederFiles = fs.readdirSync(seedersDir)
            .filter(file => file.endsWith('.ts') || file.endsWith('.js'));

        const matchedSeederFile = seederFiles.find(file => 
            file.startsWith(seederName) && 
            (file.endsWith('.ts') || file.endsWith('.js'))
        );

        if (!matchedSeederFile) {
            throw new Error(`Seeder ${seederName} not found`);
        }

        // Dynamically import the seeder
        const seederPath = path.join(seedersDir, matchedSeederFile);
        const seederModule = await import(seederPath);
        
        // Find the default export or the class with the matching name
        let seederInstance;
        if (seederModule.default) {
            seederInstance = seederModule.default;
        } else {
            const SeederClass = seederModule[seederName];
            if (SeederClass) {
                seederInstance = new SeederClass();
            }
        }

        if (!seederInstance || typeof seederInstance.run !== 'function') {
            throw new Error(`Invalid seeder: ${seederName}`);
        }

        // Run the seeder
        console.log(`Running seeder: ${seederName}`);
        await seederInstance.run();
        console.log(`Seeder ${seederName} completed successfully`);

    } catch (error) {
        console.error('Error running seeder:', error);
        process.exit(1);
    } finally {
        // Close the database connection
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    }
}

// Allow running the script directly or importing the function
if (require.main === module) {
    const seederName = process.argv[2];
    if (!seederName) {
        console.error('Please provide a seeder name');
        process.exit(1);
    }
    
    runSeeder(seederName).catch(console.error);
}

export default runSeeder;
