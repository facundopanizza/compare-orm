import { Injectable } from '@nestjs/common';
import { PostInputDto } from '../dtos/input/post.input.dto';
import { Post } from '../entities/post.entity';
import { IPostRepository } from '../interfaces/post-repository.interface';
import { InjectDrizzle } from '@knaadh/nestjs-drizzle-better-sqlite3';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from '../../../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class PostDrizzleRepository implements IPostRepository {
  constructor(
    @InjectDrizzle()
    private readonly drizzle: BetterSQLite3Database<typeof schema>,
  ) {}

  async createPost(post: PostInputDto): Promise<Post> {
    // Example: insert and return
    const [created] = await this.drizzle
      .insert(schema.postsTable)
      .values(post)
      .returning();
    return this.toPost(created);
  }

  async findPostById(id: number): Promise<Post | null> {
    const [found] = await this.drizzle
      .select()
      .from(schema.postsTable)
      .where(eq(schema.postsTable.id, id));
    return found ? (found as unknown as Post) : null;
  }

  async updatePost(id: number, post: PostInputDto): Promise<Post | null> {
    const [updated] = await this.drizzle
      .update(schema.postsTable)
      .set(post)
      .where(eq(schema.postsTable.id, id))
      .returning();
    return updated ? (updated as unknown as Post) : null;
  }

  async deletePost(id: number): Promise<true | null> {
    const result = await this.drizzle
      .delete(schema.postsTable)
      .where(eq(schema.postsTable.id, id));
    return result ? true : null;
  }

  private toPost(post: typeof schema.postsTable.$inferSelect): Post {
    return new Post({
      id: post.id,
      title: post.title,
      content: post.content,
      userId: post.userId,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt),
    });
  }
}
