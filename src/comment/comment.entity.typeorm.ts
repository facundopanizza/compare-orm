import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { UserTypeorm } from '../user/entities/user.entity.typeorm';
import { PostTypeorm } from '../post/post.entity.typeorm';

@Entity()
export class CommentTypeorm {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(() => UserTypeorm, user => user.id)
    user: UserTypeorm;

    @ManyToOne(() => PostTypeorm, post => post.comments)
    post: PostTypeorm;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
