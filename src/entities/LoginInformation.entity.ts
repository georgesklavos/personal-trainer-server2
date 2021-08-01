import { IsIP } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class LoginInformation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users)
  user: Users;

  @Column({ type: 'varchar' })
  @IsIP()
  ip: string;

  @Column({ type: 'varchar' })
  device: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
