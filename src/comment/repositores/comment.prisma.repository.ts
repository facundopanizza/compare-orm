import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentInputDto } from '../dtos/input/comment.input.dto';
import { ICommentRepository } from '../interfaces/comment-repository.interface';
import { Comment } from '../entities/comment.entity';
import { Comment as CommentPrisma } from '@prisma/client';

@Injectable()
export class CommentPrismaRepository implements ICommentRepository {
  constructor(private readonly prisma: PrismaService) { }

  async createComment(comment: CommentInputDto): Promise<Comment> {
    const savedComment = await this.prisma.comment.create({ data: comment });
    return this.toComment(savedComment);
  }

  async findCommentById(id: number): Promise<Comment | null> {
    const foundComment = await this.prisma.comment.findUnique({ where: { id } });
    if (!foundComment) return null;
    return this.toComment(foundComment);
  }

  async updateComment(id: number, comment: CommentInputDto): Promise<Comment | null> {
    const foundComment = await this.prisma.comment.findUnique({ where: { id } });
    if (!foundComment) return null;
    const updatedComment = await this.prisma.comment.update({ where: { id }, data: comment });
    return this.toComment(updatedComment);
  }

  async deleteComment(id: number): Promise<true | null> {
    const foundComment = await this.prisma.comment.findUnique({ where: { id } });
    if (!foundComment) return null;
    await this.prisma.comment.delete({ where: { id } });
    return true;
  }

  private toComment(comment: CommentPrisma): Comment {
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