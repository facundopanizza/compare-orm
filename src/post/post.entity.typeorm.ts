import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserTypeorm } from '../user/entities/user.entity.typeorm';
import { CommentTypeorm } from '../comment/comment.entity.typeorm';
import { TagTypeorm } from '../tag/tag.entity.typeorm';

@Entity()
export class PostTypeorm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => UserTypeorm, (user) => user.id)
  user: UserTypeorm;

  @OneToMany(() => CommentTypeorm, (comment) => comment.post)
  comments: CommentTypeorm[];

  @ManyToMany(() => TagTypeorm, (tag) => tag.posts)
  @JoinTable()
  tags: TagTypeorm[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
