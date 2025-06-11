import { Injectable } from '@nestjs/common';
import { UserInputDto } from './dtos/input/user.input.dto';
import { UserRepository } from './repositores/user.typeorm.repository';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }

    async createUser(user: UserInputDto) {
        return this.userRepository.createUser(user);
    }

    async findUserByEmail(email: string) {
        return this.userRepository.findUserByEmail(email);
    }

    async findUserById(id: number) {
        return this.userRepository.findUserById(id);
    }

    async updateUser(id: number, user: UserInputDto) {
        return this.userRepository.updateUser(id, user);
    }

    async deleteUser(id: number) {
        return this.userRepository.deleteUser(id);
    }
}
