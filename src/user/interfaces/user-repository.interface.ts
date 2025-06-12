import { UserInputDto } from '../dtos/input/user.input.dto';
import { User } from '../entities/user.entity';

export interface IUserRepository {
  createUser(user: UserInputDto): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserById(id: number): Promise<User | null>;
  updateUser(id: number, user: UserInputDto): Promise<User | null>;
  deleteUser(id: number): Promise<true | null>;
}
