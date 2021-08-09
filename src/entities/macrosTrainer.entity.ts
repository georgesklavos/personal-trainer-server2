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
export class MacrosTrainer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Macros, (macro) => macro.macrosTrainer)
  macro: Macros;

  @Column({ type: 'int', default: 0 })
  proteins: number;

  @Column({ type: 'int', default: 0 })
  carbs: number;

  @Column({ type: 'int', default: 0 })
  fats: number;

  @Column({ type: 'int', default: 0 })
  calories: number;

  @Column({ type: 'boolean', default: false })
  trainingDay: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
