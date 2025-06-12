import { BaseEntity } from "src/common/entities/base.entity";
import { Entity } from "typeorm";
import { UserTypeorm } from "./user.entity.typeorm";
import { User as UserPrisma } from "@prisma/client";
import * as schema from '../../../drizzle/schema';

type UserDrizzle = typeof schema.usersTable.$inferSelect;


@Entity()
export class User extends BaseEntity {
    constructor(
        user: User
    ) {
        super();
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }

    name: string;
    email: string;
    password: string;

    static fromTypeorm(user: UserTypeorm): User {
        return new User(user);
    }

    static fromPrisma(user: UserPrisma): User {
        return new User({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    }

    static fromDrizzle(user: UserDrizzle): User {
        return new User({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            createdAt: new Date(user.createdAt),
            updatedAt: new Date(user.updatedAt),
        });
    }
}