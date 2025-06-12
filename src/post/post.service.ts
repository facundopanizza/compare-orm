import { Inject, Injectable } from '@nestjs/common';
import { PostInputDto } from './dtos/input/post.input.dto';
import { Post } from './entities/post.entity';
import { IPostRepository } from './interfaces/post-repository.interface';

const POST_REPOSITORY = 'POST_REPOSITORY';

@Injectable()
export class PostService {
  constructor(
    @Inject(POST_REPOSITORY) private postRepository: IPostRepository,
  ) {}

  async createPost(post: PostInputDto): Promise<Post> {
    return this.postRepository.createPost(post);
  }

  async findPostById(id: number): Promise<Post> {
    const foundPost = await this.postRepository.findPostById(id);
    if (!foundPost) {
      throw new Error('Post not found');
    }
    return foundPost;
  }

  async updatePost(id: number, post: PostInputDto): Promise<Post> {
    const updatedPost = await this.postRepository.updatePost(id, post);
    if (!updatedPost) {
      throw new Error('Post not found');
    }
    return updatedPost;
  }

  async deletePost(id: number): Promise<true> {
    const deleted = await this.postRepository.deletePost(id);
    if (!deleted) {
      throw new Error('Post not found');
    }
    return true;
  }
}
