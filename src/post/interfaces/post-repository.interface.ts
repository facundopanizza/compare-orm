import { PostInputDto } from '../dtos/input/post.input.dto';
import { PostOutputDto } from '../dtos/output/post.output.dto';
import { Post } from '../entities/post.entity';

import { PostFindQueryDto } from '../dtos/input/post.find-query.dto';

export interface IPostRepository {
  createPost(post: PostInputDto): Promise<Post>;
  findPostById(id: number): Promise<Post | null>;
  updatePost(id: number, post: PostInputDto): Promise<Post | null>;
  deletePost(id: number): Promise<true | null>;
  findPosts(query: PostFindQueryDto): Promise<{ data: Post[]; total: number }>;
}
