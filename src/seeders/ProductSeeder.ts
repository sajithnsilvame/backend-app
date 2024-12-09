import { AppDataSource } from '../config/database';
import { Product } from '../entities/Product';
import { Seeder } from './Seeder';

export class ProductSeeder implements Seeder {
    async run(): Promise<void> {
        const repository = AppDataSource.getRepository(Product);

        // Clear existing data
        await repository.clear();

        // Create seed data
        const seedData: Partial<Product>[] = [
            {
                name: 'Laptop',
                description: 'A high-performance laptop for daily use',
                price: 1000,
                stock: 10,
                category: 'Electronics'
            },
            {
                name: 'Book',
                description: 'A collection of pages for learning and entertainment',
                price: 10,
                stock: 20,
                category: 'Books'
            }
        ];

        await repository.save(seedData);
        console.log('Product seeded successfully');
    }
}

export default new ProductSeeder();