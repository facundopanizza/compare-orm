import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserInputDto } from './dtos/input/user.input.dto';
import { User } from './entities/user.entity';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { IUserRepository } from './interfaces/user-repository.interface';
import { USER_REPOSITORY } from './user.constants';

const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
    constructor(@Inject(USER_REPOSITORY) private userRepository: IUserRepository) { }

    async createUser(user: UserInputDto): Promise<User> {
        const hashedPassword = bcrypt.hashSync(user.password, SALT_ROUNDS);


        return this.userRepository.createUser({
            ...user,
            password: hashedPassword
        });
    }

    async findUserByEmail(email: string): Promise<User> {
        const foundUser = await this.userRepository.findUserByEmail(email);

        if (!foundUser) {
            throw new UserNotFoundException();
        }

        return foundUser;
    }

    async findUserById(id: number): Promise<User> {
        const foundUser = await this.userRepository.findUserById(id);

        if (!foundUser) {
            throw new UserNotFoundException();
        }

        return foundUser;
    }

    async updateUser(id: number, user: UserInputDto): Promise<User> {
        const hashedPassword = bcrypt.hashSync(user.password, SALT_ROUNDS);
        const foundUser = await this.userRepository.updateUser(id, {
            ...user,
            password: hashedPassword
        });

        if (!foundUser) {
            throw new UserNotFoundException();
        }

        return foundUser;
    }

    async deleteUser(id: number): Promise<true> {
        const deletedUser = await this.userRepository.deleteUser(id);

        if (!deletedUser) {
            throw new UserNotFoundException();
        }

        return true;
    }
}
