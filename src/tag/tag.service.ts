import { Inject, Injectable } from '@nestjs/common';
import { TagInputDto } from './dtos/input/tag.input.dto';
import { Tag } from './entities/tag.entity';
import { ITagRepository } from './interfaces/tag-repository.interface';

const TAG_REPOSITORY = 'TAG_REPOSITORY';

@Injectable()
export class TagService {
  constructor(@Inject(TAG_REPOSITORY) private tagRepository: ITagRepository) {}

  async createTag(tag: TagInputDto): Promise<Tag> {
    return this.tagRepository.createTag(tag);
  }

  async findTagById(id: number): Promise<Tag> {
    const foundTag = await this.tagRepository.findTagById(id);
    if (!foundTag) {
      throw new Error('Tag not found');
    }
    return foundTag;
  }

  async updateTag(id: number, tag: TagInputDto): Promise<Tag> {
    const updatedTag = await this.tagRepository.updateTag(id, tag);
    if (!updatedTag) {
      throw new Error('Tag not found');
    }
    return updatedTag;
  }

  async deleteTag(id: number): Promise<true> {
    const deleted = await this.tagRepository.deleteTag(id);
    if (!deleted) {
      throw new Error('Tag not found');
    }
    return true;
  }
}
