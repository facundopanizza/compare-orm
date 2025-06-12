import { BaseEntity } from "src/common/entities/base.entity";
import { CommentTypeorm } from "../comment.entity.typeorm";
import { Comment as CommentPrisma } from "@prisma/client";
import * as schema from '../../../drizzle/schema';

type CommentDrizzle = typeof schema.commentsTable.$inferSelect;

export class Comment extends BaseEntity {
    content: string;
    postId: number;
    authorId: number;

    constructor(comment: Comment) {
        super();
        this.id = comment.id;
        this.content = comment.content;
        this.postId = comment.postId;
        this.authorId = comment.authorId;
        this.createdAt = comment.createdAt;
        this.updatedAt = comment.updatedAt;
    }
}
