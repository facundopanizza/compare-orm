import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserInputDto } from "../dtos/input/user.input.dto";
import { User } from "../entities/user.entity";
import { IUserRepository } from "../interfaces/user-repository.interface";
import { User as UserPrisma } from "@prisma/client";

@Injectable()
export class UserPrismaRepository implements IUserRepository, OnModuleInit {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async onModuleInit() {
        console.log('Using Prisma')
    }

    async createUser(user: UserInputDto): Promise<User> {
        const savedUser = await this.prisma.user.create({ data: user });

        return this.toUser(savedUser);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const foundUser = await this.prisma.user.findUnique({ where: { email } });

        if (!foundUser) {
            return null;
        }

        return this.toUser(foundUser);
    }

    async findUserById(id: number): Promise<User | null> {
        const foundUser = await this.prisma.user.findUnique({ where: { id } });

        if (!foundUser) {
            return null;
        }

        return this.toUser(foundUser);
    }

    async updateUser(id: number, user: UserInputDto): Promise<User | null> {
        const foundUser = await this.prisma.user.findUnique({ where: { id } });

        if (!foundUser) {
            return null;
        }

        const updatedUser = await this.prisma.user.update({ where: { id }, data: user });

        return this.toUser(updatedUser);
    }

    async deleteUser(id: number): Promise<true | null> {
        const foundUser = await this.prisma.user.findUnique({ where: { id } });

        if (!foundUser) {
            return null;
        }

        await this.prisma.user.delete({ where: { id } });

        return true;
    }

    private toUser(user: UserPrisma): User {
        return new User({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    }
}