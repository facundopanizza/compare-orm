import { Inject, Injectable } from '@nestjs/common';
import { CommentInputDto } from './dtos/input/comment.input.dto';
import { ICommentRepository } from './interfaces/comment-repository.interface';
import { Comment } from './entities/comment.entity';

const COMMENT_REPOSITORY = 'COMMENT_REPOSITORY';

@Injectable()
export class CommentService {
  constructor(
    @Inject(COMMENT_REPOSITORY) private commentRepository: ICommentRepository,
  ) {}

  async createComment(comment: CommentInputDto): Promise<Comment> {
    return this.commentRepository.createComment(comment);
  }

  async findCommentById(id: number): Promise<Comment> {
    const foundComment = await this.commentRepository.findCommentById(id);
    if (!foundComment) {
      throw new Error('Comment not found');
    }
    return foundComment;
  }

  async updateComment(id: number, comment: CommentInputDto): Promise<Comment> {
    const updatedComment = await this.commentRepository.updateComment(
      id,
      comment,
    );
    if (!updatedComment) {
      throw new Error('Comment not found');
    }
    return updatedComment;
  }

  async deleteComment(id: number): Promise<true> {
    const deleted = await this.commentRepository.deleteComment(id);
    if (!deleted) {
      throw new Error('Comment not found');
    }
    return true;
  }
}
