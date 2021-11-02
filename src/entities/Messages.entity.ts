import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SupportChats } from './supportChats.entity';

@Entity()
export class Messages {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => SupportChats)
  @JoinColumn()
  chat: SupportChats;

  @Column({ type: 'varchar' })
  message: string;

  @Column({ type: 'boolean' })
  deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
