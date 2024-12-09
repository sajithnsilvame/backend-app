import { AppDataSource } from '../config/database';
import { Customer } from '../entities/Customer';
import { Seeder } from './Seeder';

export class CustomerSeeder implements Seeder {
    async run(): Promise<void> {
        const repository = AppDataSource.getRepository(Customer);

        // Clear existing data
        await repository.clear();

        // Create seed data
        const seedData: Partial<Customer>[] = [
            {
                name: 'John Doe',
                email: 'john@example.com',
                product_qty: 5,
                total_amount: '100.00'
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                product_qty: 3,
                total_amount: '75.00'
            }
        ];

        await repository.save(seedData);
        console.log('Customer seeded successfully');
    }
}

export default new CustomerSeeder();