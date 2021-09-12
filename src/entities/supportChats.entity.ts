import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class SupportChats {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    name: 'supportUserId',
    default: null,
    nullable: true,
  })
  @ManyToOne(() => Users)
  @JoinColumn({
    name: 'supportUserId',
  })
  supportUser: Users;

  @ManyToOne(() => Users)
  @JoinColumn()
  user: Users;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
