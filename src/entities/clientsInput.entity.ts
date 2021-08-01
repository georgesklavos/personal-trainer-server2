import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Steps } from './steps.entity';
import { Users } from './users.entity';
import { Weights } from './weights.entity';

@Entity()
export class ClientsInput {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users)
  user: Users;

  @Column({ type: 'date' })
  date: Date;

  @OneToOne(() => Steps)
  steps: Steps;

  @OneToOne(() => Weights)
  weights: Weights;

  @Column({ type: 'varchar' })
  comments: string;
}
