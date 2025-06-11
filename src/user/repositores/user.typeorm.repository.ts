import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserInputDto } from "../dtos/input/user.input.dto";
import { User } from "../entities/user.entity";
import { UserTypeorm } from "../entities/user.entity.typeorm";
import { IUserRepository } from "../interfaces/user-repository.interface";

@Injectable()
export class UserTypeOrmRepository implements IUserRepository, OnModuleInit {
    constructor(
        @InjectRepository(UserTypeorm)
        private userRepository: Repository<UserTypeorm>
    ) { }

    async onModuleInit() {
        console.log('Using TypeORM')
    }

    async createUser(user: UserInputDto): Promise<User> {
        const savedUser = await this.userRepository.save(user);

        return User.fromTypeorm(savedUser);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const foundUser = await this.userRepository.findOne({ where: { email } });

        if (!foundUser) {
            return null;
        }

        return User.fromTypeorm(foundUser);
    }

    async findUserById(id: number): Promise<User | null> {
        const foundUser = await this.userRepository.findOne({ where: { id } });

        if (!foundUser) {
            return null;
        }

        return User.fromTypeorm(foundUser);
    }

    async updateUser(id: number, user: UserInputDto): Promise<User | null> {
        const foundUser = await this.userRepository.findOne({ where: { id } });

        if (!foundUser) {
            return null;
        }

        foundUser.name = user.name;
        foundUser.email = user.email;
        foundUser.password = user.password;

        const updatedUser = await this.userRepository.save(foundUser);

        return User.fromTypeorm(updatedUser);
    }

    async deleteUser(id: number): Promise<true | null> {
        const foundUser = await this.userRepository.findOne({ where: { id } });

        if (!foundUser) {
            return null;
        }

        await this.userRepository.remove(foundUser);


        return true;
    }
}