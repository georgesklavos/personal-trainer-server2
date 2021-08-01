import {
  Column,
  Entity,
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
  user: Users;

  @Column({ type: 'date' })
  date: Date;

  @OneToOne(() => ClientsDay)
  client: ClientsDay;

  @OneToOne(() => TrainersDay)
  trainers: Trainers;
}
