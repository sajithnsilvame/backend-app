import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import { Seeder } from "./Seeder";

export class UserSeeder implements Seeder {
    async run(): Promise<void> {
        const userRepository = AppDataSource.getRepository(User);

        const users = [
            {
                name: "John Doe",
                email: "john@example.com"
            },
            {
                name: "Jane Smith",
                email: "jane@example.com"
            },
            {
                name: "Bob Johnson",
                email: "bob@example.com"
            }
        ];

        for (const userData of users) {
            const existingUser = await userRepository.findOne({ where: { email: userData.email } });
            if (!existingUser) {
                const user = userRepository.create(userData);
                await userRepository.save(user);
            }
        }
    }
}
