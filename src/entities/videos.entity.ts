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
export class Videos {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'boolean' })
  enabled: boolean;

  @Column({ type: 'double' })
  size: number;

  @ManyToOne(() => Users)
  @JoinColumn()
  reviewer: Users;

  @ManyToOne(() => Users)
  @JoinColumn()
  user: Users;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
