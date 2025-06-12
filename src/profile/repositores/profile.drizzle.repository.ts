import { InjectDrizzle } from '@knaadh/nestjs-drizzle-better-sqlite3';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from '../../../drizzle/schema';
import { ProfileInputDto } from '../dtos/input/profile.input.dto';
import { Profile } from '../entities/profile.entity';
import { IProfileRepository } from '../interfaces/profile-repository.interface';

@Injectable()
export class ProfileDrizzleRepository implements IProfileRepository {
  constructor(
    @InjectDrizzle()
    private readonly drizzle: BetterSQLite3Database<typeof schema>,
  ) {}

  async createProfile(profile: ProfileInputDto): Promise<Profile> {
    const [created] = await this.drizzle
      .insert(schema.profilesTable)
      .values({
        userId: profile.userId,
        bio: profile.bio,
        avatar: profile.avatar,
      })
      .returning();
    return this.toProfile(created);
  }

  async findProfileById(id: number): Promise<Profile | null> {
    const [found] = await this.drizzle
      .select()
      .from(schema.profilesTable)
      .where(eq(schema.profilesTable.id, id))
      .limit(1);
    return found ? this.toProfile(found) : null;
  }

  async updateProfile(
    id: number,
    profile: ProfileInputDto,
  ): Promise<Profile | null> {
    const [updated] = await this.drizzle
      .update(schema.profilesTable)
      .set({
        userId: profile.userId,
        bio: profile.bio,
        avatar: profile.avatar,
      })
      .where(eq(schema.profilesTable.id, id))
      .returning();
    return updated ? this.toProfile(updated) : null;
  }

  async deleteProfile(id: number): Promise<true | null> {
    const result = await this.drizzle
      .delete(schema.profilesTable)
      .where(eq(schema.profilesTable.id, id));
    return result ? true : null;
  }

  private toProfile(
    profile: typeof schema.profilesTable.$inferSelect,
  ): Profile {
    return new Profile({
      id: profile.id,
      bio: profile.bio,
      avatar: profile.avatar,
      userId: profile.userId,
    });
  }
}
