import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { Seeder } from './Seeder';

export class UserSeeder implements Seeder {
    async run(): Promise<void> {
        const repository = AppDataSource.getRepository(User);

        // Clear existing data
        await repository.clear();

        // Create seed data
        const seedData: Partial<User>[] = [
            {
                // Add your seed data here
                // Example: name: 'John Doe',
                // email: 'john@example.com'
            }
        ];

        await repository.save(seedData);
        console.log('User seeded successfully');
    }
}

export default new UserSeeder();