import { IsInt } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Levels } from './levels.entity';
import { Owners } from './owners.entity';
import { Programs } from './programs.entity';
import { Targets } from './targets.entity';
import { Trainers } from './trainers.entity';
import { Users } from './users.entity';

@Entity()
export class Clients {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Users, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: Users;

  @ManyToMany(() => Owners)
  @JoinColumn()
  owner: Owners;

  @Column({ type: 'int', default: 0 })
  @IsInt()
  age: number;

  @ManyToMany(() => Levels)
  @JoinColumn()
  level: number;

  @Column({ type: 'boolean' })
  active: boolean;

  @Column({ type: 'boolean' })
  payment: boolean;

  @ManyToMany(() => Programs)
  @JoinColumn()
  program: Programs;

  @Column({ type: 'int', default: 0 })
  lastWeightNumber: number;

  @Column({ type: 'int', default: 0 })
  heightNumber: number;

  @ManyToMany(() => Targets)
  @JoinColumn()
  target: Targets;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'varchar' })
  notes: string;

  @ManyToMany(() => Trainers)
  @JoinColumn()
  trainer: Trainers;

  @Column({ type: 'boolean' })
  viewedByTrainer: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
