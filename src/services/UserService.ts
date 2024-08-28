import bcrypt from 'bcrypt';
import { User } from '../models/User';
import dataSource from '../config/dataSource';
import { UserRepository } from '../repositories/UserRepository';

export class UserService {
  private userRepository = UserRepository(dataSource);

  async registerUser(fullname: string, email: string, login: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User(fullname, email, login, hashedPassword);
    return this.userRepository.save(newUser);
  }

  async getUsers(fullname?: string, email?: string, page: number = 1, limit: number = 10) {
    return this.userRepository.getByFilter(fullname, email, page, limit);
  }

  async getUserById(id: string) {
    return this.userRepository.getById(id);
  }
}
