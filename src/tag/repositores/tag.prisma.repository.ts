import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TagInputDto } from '../dtos/input/tag.input.dto';
import { ITagRepository } from '../interfaces/tag-repository.interface';
import { Tag } from '../entities/tag.entity';
import { Tag as TagPrisma } from '@prisma/client';

@Injectable()
export class TagPrismaRepository implements ITagRepository {
  constructor(private readonly prisma: PrismaService) { }

  async createTag(tag: TagInputDto): Promise<Tag> {
    const savedTag = await this.prisma.tag.create({ data: tag });
    return this.toTag(savedTag);
  }

  async findTagById(id: number): Promise<Tag | null> {
    const foundTag = await this.prisma.tag.findUnique({ where: { id } });
    if (!foundTag) return null;
    return this.toTag(foundTag);
  }

  async updateTag(id: number, tag: TagInputDto): Promise<Tag | null> {
    const foundTag = await this.prisma.tag.findUnique({ where: { id } });
    if (!foundTag) return null;
    const updatedTag = await this.prisma.tag.update({ where: { id }, data: tag });
    return this.toTag(updatedTag);
  }

  async deleteTag(id: number): Promise<true | null> {
    const foundTag = await this.prisma.tag.findUnique({ where: { id } });
    if (!foundTag) return null;
    await this.prisma.tag.delete({ where: { id } });
    return true;
  }

  private toTag(tag: TagPrisma): Tag {
    return new Tag({
      id: tag.id,
      name: tag.name,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
    });
  }
}