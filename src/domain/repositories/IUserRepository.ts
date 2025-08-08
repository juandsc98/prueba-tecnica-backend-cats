import { User, UserWithoutPassword } from '../entities/User';

export interface IUserRepository {
  create(user: User): Promise<UserWithoutPassword>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<UserWithoutPassword | null>;
  update(id: string, userData: Partial<User>): Promise<UserWithoutPassword | null>;
  delete(id: string): Promise<boolean>;
}

