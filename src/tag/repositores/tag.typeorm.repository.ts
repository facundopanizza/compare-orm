import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagInputDto } from '../dtos/input/tag.input.dto';
import { Tag } from '../entities/tag.entity';
import { ITagRepository } from '../interfaces/tag-repository.interface';
import { TagTypeorm } from '../tag.entity.typeorm';

@Injectable()
export class TagTypeormRepository implements ITagRepository {
  constructor(
    @InjectRepository(TagTypeorm)
    private readonly tagRepo: Repository<TagTypeorm>,
  ) {}

  async createTag(tag: TagInputDto): Promise<Tag> {
    const entity = this.tagRepo.create(tag);
    const saved = await this.tagRepo.save(entity);
    const created = await this.findTagById(saved.id);

    return created!;
  }

  async findTagById(id: number): Promise<Tag | null> {
    const found = await this.tagRepo.findOne({ where: { id } });
    return found ? this.toTag(found) : null;
  }

  async updateTag(id: number, tag: TagInputDto): Promise<Tag | null> {
    const found = await this.tagRepo.findOne({ where: { id } });
    if (!found) return null;

    found.name = tag.name;

    const saved = await this.tagRepo.save(found);
    return this.toTag(saved);
  }

  async deleteTag(id: number): Promise<true | null> {
    const result = await this.tagRepo.delete(id);
    return result.affected ? true : null;
  }

  private toTag(tag: TagTypeorm): Tag {
    return new Tag({
      id: tag.id,
      name: tag.name,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
    });
  }
}
