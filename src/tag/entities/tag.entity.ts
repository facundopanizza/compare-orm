import { BaseEntity } from 'src/common/entities/base.entity';

export class Tag extends BaseEntity {
  name: string;

  constructor(tag: Tag) {
    super();
    this.id = tag.id;
    this.name = tag.name;
    this.createdAt = tag.createdAt;
    this.updatedAt = tag.updatedAt;
  }
}
