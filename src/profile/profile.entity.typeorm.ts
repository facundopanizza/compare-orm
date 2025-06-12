import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserTypeorm } from '../user/entities/user.entity.typeorm';

@Entity()
export class ProfileTypeorm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToOne(() => UserTypeorm)
  @JoinColumn()
  user: UserTypeorm;
}
