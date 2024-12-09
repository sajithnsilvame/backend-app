import * as fs from 'fs';
import * as path from 'path';

const generateSeeder = (entityName: string) => {
    const seederTemplate = `import { AppDataSource } from '../config/database';
import { ${entityName} } from '../entities/${entityName}';
import { Seeder } from '../config/seeder/Seeder';

export class ${entityName}Seeder implements Seeder {
    async run(): Promise<void> {
        const repository = AppDataSource.getRepository(${entityName});

        // Clear existing data
        await repository.clear();

        // Create seed data
        const seedData: Partial<${entityName}>[] = [
            {
                // Add your seed data here
                
            }
        ];

        await repository.save(seedData);
        console.log('${entityName} seeded successfully');
    }
}

export default new ${entityName}Seeder();`;

    // Define seeder directory
    const seedersDir = path.join(__dirname, '..', 'seeders');
    
    const seederPath = path.join(seedersDir, `${entityName}Seeder.ts`);
    
    // Ensure the seeders directory exists
    fs.mkdirSync(seedersDir, { recursive: true });

    // Write the seeder file
    fs.writeFileSync(seederPath, seederTemplate);
    
    console.log(`Seeder for ${entityName} generated at ${seederPath}`);

    // Update seeders index
//     const indexPath = path.join(seedersDir, 'index.ts');
//     let indexContent = fs.existsSync(indexPath) 
//         ? fs.readFileSync(indexPath, 'utf-8') 
//         : `import { Seeder } from './Seeder';\n\nexport const seeders: Seeder[] = [];\n`;
    
    
//     const updatedContent = indexContent.replace(
//         'export const seeders: Seeder[] = [];', 
//         `export const seeders: Seeder[] = [];\nimport ${entityName}Seeder from './${entityName}Seeder';
// seeders.push(${entityName}Seeder);`
//     );

//     fs.writeFileSync(indexPath, updatedContent);
//     console.log(`Updated seeders index at ${indexPath}`);
};

// Get entity name from command line
const entityName = process.argv[2];

if (!entityName) {
    console.error('Please provide an entity name');
    process.exit(1);
}

generateSeeder(entityName);
