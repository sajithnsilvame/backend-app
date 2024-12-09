import { AppDataSource } from '../config/database';
import { Order } from '../entities/Order';
import { Seeder } from '../config/seeder/Seeder';

export class OrderSeeder implements Seeder {
    async run(): Promise<void> {
        const repository = AppDataSource.getRepository(Order);

        // Clear existing data
        await repository.clear();

        // Create seed data
        const seedData: Partial<Order>[] = [
            {
                customer_name: 'John Doe',
                customer_address: '123 Main St',
                customer_mobile: '123-456-7890'
                
            }
        ];

        await repository.save(seedData);
        console.log('Order seeded successfully');
    }
}

export default new OrderSeeder();