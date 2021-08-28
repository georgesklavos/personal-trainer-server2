import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Owners {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Users, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: Users;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'int' })
  clients: number;

  @Column({ type: 'int' })
  trainers: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
