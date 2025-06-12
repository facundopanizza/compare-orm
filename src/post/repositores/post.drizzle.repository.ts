import { InjectDrizzle } from '@knaadh/nestjs-drizzle-better-sqlite3';
import { Injectable } from '@nestjs/common';
import { and, count, eq, inArray, like, or, SQLWrapper } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from '../../../drizzle/schema';
import { PostFindQueryDto } from '../dtos/input/post.find-query.dto';
import { PostInputDto } from '../dtos/input/post.input.dto';
import { Post } from '../entities/post.entity';
import { IPostRepository } from '../interfaces/post-repository.interface';

@Injectable()
export class PostDrizzleRepository implements IPostRepository {
  constructor(
    @InjectDrizzle()
    private readonly drizzle: BetterSQLite3Database<typeof schema>,
  ) { }

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

  async findPosts(query: PostFindQueryDto): Promise<{ data: Post[]; total: number }> {
    const {
      text,
      userId,
      tags,
      orderBy = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 10,
    } = query;
    const conditions: (SQLWrapper | undefined)[] = [];

    if (userId) {
      conditions.push(eq(schema.postsTable.userId, userId));
    }

    if (text) {
      conditions.push(
        or(
          like(schema.postsTable.title, `%${text}%`),
          like(schema.postsTable.content, `%${text}%`),
        ),
      );
    }

    if (tags && tags.length > 0) {
      const subquery = this.drizzle
        .select({ postId: schema.postTagsTable.postId })
        .from(schema.postTagsTable)
        .where(inArray(schema.postTagsTable.tagId, tags));
      conditions.push(inArray(schema.postsTable.id, subquery));
    }

    const whereClause = and(...conditions);

    const [foundPosts, totalResult] = await Promise.all([
      this.drizzle.query.postsTable.findMany({
        where: whereClause,
        with: {
          user: true,
          tags: {
            with: {
              tag: true,
            },
          },
        },
        orderBy: (posts, { asc, desc }) => [
          order === 'desc' ? desc(posts[orderBy]) : asc(posts[orderBy]),
        ],
        offset: (page - 1) * limit,
        limit: limit,
      }),
      this.drizzle.select({ total: count() }).from(schema.postsTable).where(whereClause),
    ]);

    return {
      data: foundPosts.map((p) => this.toPost(p)),
      total: totalResult[0].total,
    };
  }
}
