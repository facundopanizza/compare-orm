import { CommentInputDto } from '../dtos/input/comment.input.dto';
import { Comment } from '../entities/comment.entity';

export interface ICommentRepository {
  createComment(comment: CommentInputDto): Promise<Comment>;
  findCommentById(id: number): Promise<Comment | null>;
  updateComment(id: number, comment: CommentInputDto): Promise<Comment | null>;
  deleteComment(id: number): Promise<true | null>;
}
