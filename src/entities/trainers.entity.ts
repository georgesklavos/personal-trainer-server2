import { IsInt } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Levels } from './levels.entity';
import { Owners } from './owners.entity';

@Entity()
export class Trainers {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Owners)
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
  verifyPayments: boolean;

  @Column({ type: 'int' })
  paymentNumber: number;

  @Column({ type: 'varchar' })
  notes: string;

  @Column({ type: 'int' })
  clientsNumber: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
