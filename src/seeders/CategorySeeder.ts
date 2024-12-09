import { AppDataSource } from '../config/database';
import { Category } from '../entities/Category';
import { Seeder } from './Seeder';

export class CategorySeeder implements Seeder {
    async run(): Promise<void> {
        const repository = AppDataSource.getRepository(Category);

        // Clear existing data
        await repository.clear();

        // Create seed data
        const seedData: Partial<Category>[] = [
            { 
                name: 'Electronics',
                description: 'Devices and gadgets for modern living'    
            },
            { 
                name: 'Books',
                description: 'Literature, novels, and educational materials'    
            }
        ];

        await repository.save(seedData);
        console.log('Category seeded successfully');
    }
}

export default new CategorySeeder();