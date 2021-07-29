import { IsInt } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Levels } from './levels.entity';
import { Owners } from './owners.entity';
import { Users } from './users.entity';

@Entity()
export class Trainers {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Users, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: Users;

  @ManyToOne(() => Owners)
  @JoinColumn()
  owner: Owners;

  @Column({ type: 'int', default: 0 })
  @IsInt()
  age: number;

  @ManyToOne(() => Levels)
  @JoinColumn()
  level: Levels;

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
