import { AppDataSource } from "../config/database";
import { User } from "../entities/User";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(name: string, email: string): Promise<User> {
    const user = new User();
    user.name = name;
    user.email = email;
    return this.userRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
