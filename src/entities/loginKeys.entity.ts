import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class LoginKeys {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Users)
  @JoinColumn()
  user: Users;

  @Column({ type: 'varchar' })
  code: string;
}
