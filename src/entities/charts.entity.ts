import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Systems } from './systems.entity';
import { Users } from './users.entity';

@Entity()
export class Chart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users)
  user: Users;

  @Column({ type: 'int', default: 0 })
  steps: number;

  @Column({ type: 'int', default: 0 })
  protein: number;

  @Column({ type: 'int', default: 0 })
  carbs: number;

  @Column({ type: 'int', default: 0 })
  fat: number;

  @Column({ type: 'int', default: 0 })
  weight: number;

  @ManyToOne(() => Systems)
  systemSaved: Systems;

  @Column({ type: 'date' })
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
