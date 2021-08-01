import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Systems } from './systems.entity';

@Entity()
export class Weights {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  weight: number;

  @Column({ type: 'int' })
  fat: number;

  @Column({ type: 'int' })
  muscle: number;

  @Column({ type: 'int' })
  bone: number;

  @Column({ type: 'int' })
  bmi: number;

  @Column({ type: 'varchar' })
  notes: string;

  @ManyToOne(() => Systems)
  @JoinColumn()
  systemSaved: Systems;
}
