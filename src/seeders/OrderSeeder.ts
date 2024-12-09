import { AppDataSource } from '../config/database';
import { Order } from '../entities/Order';
import { Seeder } from './Seeder';

export class OrderSeeder implements Seeder {
    async run(): Promise<void> {
        const repository = AppDataSource.getRepository(Order);

        // Clear existing data
        await repository.clear();

        // Create seed data
        const seedData: Partial<Order>[] = [
            {
                customer_name: 'John Doe',
                customer: 'John Doe',
                customer_mobile: '1234567890'
            },
            {
                customer_name: 'Jane Smith',
                customer: 'Jane Smith',
                customer_mobile: '9876543210'
            }
        ];

        await repository.save(seedData);
        console.log('Order seeded successfully');
    }
}

export default new OrderSeeder();