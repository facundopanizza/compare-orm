import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentTypeorm } from '../comment.entity.typeorm';
import { CommentInputDto } from '../dtos/input/comment.input.dto';
import { Comment } from '../entities/comment.entity';
import { ICommentRepository } from '../interfaces/comment-repository.interface';

@Injectable()
export class CommentTypeormRepository implements ICommentRepository {
  constructor(
    @InjectRepository(CommentTypeorm)
    private readonly commentRepo: Repository<CommentTypeorm>,
  ) {}

  async createComment(comment: CommentInputDto): Promise<Comment> {
    const entity = this.commentRepo.create({
      ...comment,
      user: { id: comment.userId },
      post: { id: comment.postId },
    });
    const saved = await this.commentRepo.save(entity);
    const created = await this.commentRepo.findOne({
      where: { id: saved.id },
      relations: { user: true, post: true },
    });

    return this.toComment(created!);
  }

  async findCommentById(id: number): Promise<Comment | null> {
    const found = await this.commentRepo.findOne({
      where: { id },
      relations: { user: true, post: true },
    });
    return found ? this.toComment(found) : null;
  }

  async updateComment(
    id: number,
    comment: CommentInputDto,
  ): Promise<Comment | null> {
    const found = await this.commentRepo.findOne({
      where: { id },
      relations: { user: true, post: true },
    });
    if (!found) return null;

    found.content = comment.content;

    const saved = await this.commentRepo.save(found);
    return this.toComment(saved);
  }

  async deleteComment(id: number): Promise<true | null> {
    const result = await this.commentRepo.delete(id);
    return result.affected ? true : null;
  }

  private toComment(comment: CommentTypeorm): Comment {
    return new Comment({
      id: comment.id,
      content: comment.content,
      postId: comment.post.id,
      authorId: comment.user.id,
      createdAt: new Date(comment.createdAt),
      updatedAt: new Date(comment.updatedAt),
    });
  }
}
