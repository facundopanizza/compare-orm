import { TagInputDto } from '../dtos/input/tag.input.dto';
import { Tag } from '../entities/tag.entity';

export interface ITagRepository {
  createTag(tag: TagInputDto): Promise<Tag>;
  findTagById(id: number): Promise<Tag | null>;
  updateTag(id: number, tag: TagInputDto): Promise<Tag | null>;
  deleteTag(id: number): Promise<true | null>;
}
