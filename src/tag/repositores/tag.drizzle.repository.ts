import { InjectDrizzle } from '@knaadh/nestjs-drizzle-better-sqlite3';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from '../../../drizzle/schema';
import { TagInputDto } from '../dtos/input/tag.input.dto';
import { TagOutputDto } from '../dtos/output/tag.output.dto';
import { Tag } from '../entities/tag.entity';
import { ITagRepository } from '../interfaces/tag-repository.interface';

@Injectable()
export class TagDrizzleRepository implements ITagRepository {
  constructor(
    @InjectDrizzle()
    private readonly drizzle: BetterSQLite3Database<typeof schema>,
  ) {}

  async createTag(tag: TagInputDto): Promise<Tag> {
    const [created] = await this.drizzle
      .insert(schema.tagsTable)
      .values(tag)
      .returning();
    return this.toTag(created);
  }

  async findTagById(id: number): Promise<Tag | null> {
    const [found] = await this.drizzle
      .select()
      .from(schema.tagsTable)
      .where(eq(schema.tagsTable.id, id));
    return found ? this.toTag(found) : null;
  }

  async updateTag(id: number, tag: TagInputDto): Promise<Tag | null> {
    const [updated] = await this.drizzle
      .update(schema.tagsTable)
      .set(tag)
      .where(eq(schema.tagsTable.id, id))
      .returning();
    return updated ? this.toTag(updated) : null;
  }

  async deleteTag(id: number): Promise<true | null> {
    const result = await this.drizzle
      .delete(schema.tagsTable)
      .where(eq(schema.tagsTable.id, id));
    return result ? true : null;
  }

  private toTag(tag: typeof schema.tagsTable.$inferSelect): Tag {
    return new Tag({
      id: tag.id,
      name: tag.name,
      createdAt: new Date(tag.createdAt),
      updatedAt: new Date(tag.updatedAt),
    });
  }
}
