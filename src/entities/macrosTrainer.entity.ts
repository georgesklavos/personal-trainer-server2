import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Macros } from './macros.entity';

@Entity()
export class macrosTrainer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Macros, (macro) => macro.macrosTrainer)
  macro: Macros;

  @Column({ type: 'int' })
  proteins: number;

  @Column({ type: 'int' })
  carbs: number;

  @Column({ type: 'int' })
  fats: number;

  @Column({ type: 'int' })
  calories: number;

  @Column({ type: 'boolean', default: false })
  trainingDay: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
