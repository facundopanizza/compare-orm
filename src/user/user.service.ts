import { Inject, Injectable } from '@nestjs/common';
import { UserInputDto } from './dtos/input/user.input.dto';
import { UserOutputDto } from './dtos/output/user.output.dto';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { IUserRepository } from './interfaces/user-repository.interface';
import { USER_REPOSITORY } from './user.constants';

@Injectable()
export class UserService {
    constructor(@Inject(USER_REPOSITORY) private userRepository: IUserRepository) { }

    async createUser(user: UserInputDto): Promise<UserOutputDto> {
        return this.userRepository.createUser(user);
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
        const foundUser = await this.userRepository.updateUser(id, user);

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
