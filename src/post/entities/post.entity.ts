import { BaseEntity } from 'src/common/entities/base.entity';

export class Post extends BaseEntity {
  title: string;
  content: string;
  userId: number;

  constructor(post: Post) {
    super();
    this.id = post.id;
    this.title = post.title;
    this.content = post.content;
    this.userId = post.userId;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
  }
}
