import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MacrosClient } from './macrosClient.entity';
import { MacrosTrainer } from './macrosTrainer.entity';
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

  @OneToMany(() => MacrosClient, (macrosClient) => macrosClient.macro)
  macrosClient: MacrosClient;

  @OneToMany(() => MacrosTrainer, (macrosTrainer) => macrosTrainer.macro)
  macrosTrainer: MacrosTrainer;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
