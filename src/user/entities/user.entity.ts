import { BaseEntity } from "src/common/entities/base.entity";
import { Entity } from "typeorm";
import { UserTypeorm } from "./user.entity.typeorm";

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
}