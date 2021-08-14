import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientsDay } from './ClientsDay.entity';
import { Trainers } from './trainers.entity';
import { TrainersDay } from './TrainersDay.entity';
import { Users } from './users.entity';

@Entity()
export class Days {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users)
  @JoinColumn()
  user: Users;

  @Column({ type: 'date' })
  date: Date;

  @OneToOne(() => ClientsDay)
  @JoinColumn()
  client: ClientsDay;

  @OneToOne(() => TrainersDay)
  @JoinColumn()
  trainers: Trainers;
}
