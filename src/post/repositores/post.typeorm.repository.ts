import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostFindQueryDto } from '../dtos/input/post.find-query.dto';
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
    const entity = this.postRepo.create({ ...post, user: { id: post.userId } });
    const saved = await this.postRepo.save(entity);
    const createdPost = await this.findPostById(saved.id);

    return createdPost!;
  }

  async findPostById(id: number): Promise<Post | null> {
    const found = await this.postRepo.findOne({
      where: { id },
      relations: { user: true },
    });
    return found ? this.toPost(found) : null;
  }

  async updatePost(id: number, post: PostInputDto): Promise<Post | null> {
    const found = await this.postRepo.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!found) return null;

    found.title = post.title;
    found.content = post.content;

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

  async findPosts(query: PostFindQueryDto): Promise<{ data: Post[]; total: number }> {
    const { text, userId, tags, orderBy, order, page = 1, limit = 10 } = query;
    const qb = this.postRepo.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.tags', 'tag');

    if (userId) {
      qb.andWhere('post.userId = :userId', { userId });
    }
    if (text) {
      qb.andWhere('(post.title LIKE :text OR post.content LIKE :text)', { text: `%${text}%` });
    }
    if (tags && tags.length > 0) {
      qb.andWhere('tag.id IN (:...tags)', { tags });
    }
    if (orderBy) {
      qb.orderBy(`post.${orderBy}`, order === 'desc' ? 'DESC' : 'ASC');
    }
    qb.skip((page - 1) * limit).take(limit);

    const [posts, total] = await qb.getManyAndCount();
    return {
      data: posts.map((p) => this.toPost(p)),
      total,
    };
  }
}
