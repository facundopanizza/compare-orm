import { Inject, Injectable } from '@nestjs/common';
import { UserInputDto } from './dtos/input/user.input.dto';
import { UserOutputDto } from './dtos/output/user.output.dto';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { IUserRepository } from './interfaces/user-repository.interface';
import { USER_REPOSITORY } from './user.constants';
import * as bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
    constructor(@Inject(USER_REPOSITORY) private userRepository: IUserRepository) { }

    async createUser(user: UserInputDto): Promise<UserOutputDto> {
        const hashedPassword = bcrypt.hashSync(user.password, SALT_ROUNDS);


        return this.userRepository.createUser({
            ...user,
            password: hashedPassword
        });
    }

    async findUserByEmail(email: string): Promise<UserOutputDto> {
        const foundUser = await this.userRepository.findUserByEmail(email);

        if (!foundUser) {
            throw new UserNotFoundException();
        }

        return foundUser;
    }

    async findUserById(id: number): Promise<UserOutputDto> {
        const foundUser = await this.userRepository.findUserById(id);

        if (!foundUser) {
            throw new UserNotFoundException();
        }

        return foundUser;
    }

    async updateUser(id: number, user: UserInputDto): Promise<UserOutputDto> {
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
