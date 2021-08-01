import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Systems } from './systems.entity';

@Entity()
export class Steps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  number: number;

  @Column({ type: 'int' })
  distance: number;

  @Column({ type: 'int' })
  period: number;

  @ManyToOne(() => Systems)
  @JoinColumn()
  systemSaved: Systems;
}
