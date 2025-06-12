import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostInputDto } from '../dtos/input/post.input.dto';
import { Post } from '../entities/post.entity';
import { IPostRepository } from '../interfaces/post-repository.interface';

@Injectable()
export class PostPrismaRepository implements IPostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(post: PostInputDto): Promise<Post> {
    const createdPost = (await this.prisma.post.create({
      data: post,
    })) as unknown as Post;

    return this.toPost(createdPost);
  }

  async findPostById(id: number): Promise<Post | null> {
    const foundPost = (await this.prisma.post.findUnique({
      where: { id },
    })) as unknown as Post;

    return foundPost ? this.toPost(foundPost) : null;
  }

  async updatePost(id: number, post: PostInputDto): Promise<Post | null> {
    try {
      const updatedPost = (await this.prisma.post.update({
        where: { id },
        data: post,
      })) as unknown as Post;

      return this.toPost(updatedPost);
    } catch {
      return null;
    }
  }

  async deletePost(id: number): Promise<true | null> {
    try {
      await this.prisma.post.delete({ where: { id } });
      return true;
    } catch {
      return null;
    }
  }

  private toPost(post: Post): Post {
    return new Post({
      id: post.id,
      title: post.title,
      content: post.content,
      userId: post.userId,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt),
    });
  }
}
