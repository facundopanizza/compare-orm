import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  constructor(user: User) {
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
}
