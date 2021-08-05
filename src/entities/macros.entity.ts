import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { macrosClient } from './macrosClient.entity';
import { macrosTrainer } from './macrosTrainer.entity';
import { Trainers } from './trainers.entity';
import { Users } from './users.entity';

@Entity()
export class Macros {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users)
  user: Users;

  @ManyToOne(() => Trainers)
  trainer: Trainers;

  @OneToMany(() => macrosClient, (macrosClient) => macrosClient.macro)
  macrosClient: macrosClient;

  @OneToMany(() => macrosTrainer, (macrosTrainer) => macrosTrainer.macro)
  macrosTrainer: macrosTrainer;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
