import { Injectable } from '@nestjs/common';
import { CommentInputDto } from '../dtos/input/comment.input.dto';
import { Comment } from '../entities/comment.entity';
import { ICommentRepository } from '../interfaces/comment-repository.interface';
import { InjectDrizzle } from '@knaadh/nestjs-drizzle-better-sqlite3';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from '../../../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class CommentDrizzleRepository implements ICommentRepository {
    constructor(
        @InjectDrizzle()
        private readonly drizzle: BetterSQLite3Database<typeof schema>,
    ) { }

    async createComment(comment: CommentInputDto): Promise<Comment> {
        const [created] = await this.drizzle.insert(schema.commentsTable).values(comment).returning();

        return this.toComment(created);
    }

    async findCommentById(id: number): Promise<Comment | null> {
        const [found] = await this.drizzle.select().from(schema.commentsTable).where(eq(schema.commentsTable.id, id));
        return found ? this.toComment(found) : null;
    }

    async updateComment(id: number, comment: CommentInputDto): Promise<Comment | null> {
        const [updated] = await this.drizzle.update(schema.commentsTable).set(comment).where(eq(schema.commentsTable.id, id)).returning();
        return updated ? this.toComment(updated) : null;
    }

    async deleteComment(id: number): Promise<true | null> {
        const result = await this.drizzle.delete(schema.commentsTable).where(eq(schema.commentsTable.id, id));
        return result ? true : null;
    }

    private toComment(comment: typeof schema.commentsTable.$inferSelect): Comment {
        return new Comment({
            id: comment.id,
            content: comment.content,
            postId: comment.postId,
            authorId: comment.userId,
            createdAt: new Date(comment.createdAt),
            updatedAt: new Date(comment.updatedAt),
        });
    }
}