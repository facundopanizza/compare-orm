import { InjectDrizzle } from '@knaadh/nestjs-drizzle-better-sqlite3';
import { OnModuleInit } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from '../../../drizzle/schema';
import { UserInputDto } from '../dtos/input/user.input.dto';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../interfaces/user-repository.interface';

export class UserDrizzleRepository implements IUserRepository, OnModuleInit {
  constructor(
    @InjectDrizzle()
    private readonly drizzle: BetterSQLite3Database<typeof schema>,
  ) {}

  onModuleInit() {
    console.log('Using Drizzle');
  }

  async createUser(user: UserInputDto): Promise<User> {
    const savedUser = await this.drizzle
      .insert(schema.usersTable)
      .values({
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .returning();

    return this.toUser(savedUser[0]);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const foundUser = await this.drizzle
      .select()
      .from(schema.usersTable)
      .where(eq(schema.usersTable.email, email))
      .limit(1);

    if (!foundUser.length) {
      return null;
    }

    return this.toUser(foundUser[0]);
  }

  async findUserById(id: number): Promise<User | null> {
    const foundUser = await this.drizzle
      .select()
      .from(schema.usersTable)
      .where(eq(schema.usersTable.id, id))
      .limit(1);

    if (!foundUser.length) {
      return null;
    }

    return this.toUser(foundUser[0]);
  }

  async updateUser(id: number, user: UserInputDto): Promise<User | null> {
    const foundUser = await this.findUserById(id);

    if (!foundUser) {
      return null;
    }

    const updatedUser = await this.drizzle
      .update(schema.usersTable)
      .set({
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .where(eq(schema.usersTable.id, id))
      .returning();

    return this.toUser(updatedUser[0]);
  }

  async deleteUser(id: number): Promise<true | null> {
    const foundUser = await this.findUserById(id);

    if (!foundUser) {
      return null;
    }

    await this.drizzle
      .delete(schema.usersTable)
      .where(eq(schema.usersTable.id, id));

    return true;
  }

  private toUser(user: typeof schema.usersTable.$inferSelect): User {
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
