import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostInputDto } from '../dtos/input/post.input.dto';
import { Post } from '../entities/post.entity';
import { IPostRepository } from '../interfaces/post-repository.interface';
import { PostTypeorm } from '../post.entity.typeorm';

@Injectable()
export class PostTypeormRepository implements IPostRepository {
  constructor(
    @InjectRepository(PostTypeorm)
    private readonly postRepo: Repository<PostTypeorm>,
  ) { }

  async createPost(post: PostInputDto): Promise<Post> {
    const entity = this.postRepo.create(post);
    const saved = await this.postRepo.save(entity);
    const createdPost = await this.findPostById(saved.id)

    return createdPost!;
  }

  async findPostById(id: number): Promise<Post | null> {
    const found = await this.postRepo.findOne({ where: { id }, relations: { user: true } });
    return found ? this.toPost(found) : null;
  }

  async updatePost(id: number, post: PostInputDto): Promise<Post | null> {
    const found = await this.postRepo.findOne({ where: { id }, relations: { user: true } });
    if (!found) return null;
    Object.assign(found, post);
    const saved = await this.postRepo.save(found);
    return this.toPost(saved);
  }

  async deletePost(id: number): Promise<true | null> {
    const result = await this.postRepo.delete(id);
    return result.affected ? true : null;
  }

  private toPost(post: PostTypeorm): Post {
    return new Post({
      id: post.id,
      title: post.title,
      content: post.content,
      userId: post.user.id,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt),
    });
  }
}
