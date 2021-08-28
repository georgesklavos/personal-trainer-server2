import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Macros } from './macros.entity';
import { Systems } from './systems.entity';

@Entity()
export class MacrosClient {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Macros, (macro) => macro.macrosClient)
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

  @Column({
    name: 'systemSavedId',
    default: 1,
  })
  @ManyToOne(() => Systems)
  @JoinColumn({
    name: 'systemSavedId',
  })
  systemSaved: Systems;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
