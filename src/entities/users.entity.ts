import { IsEmail, IsInt } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Languages } from './languages.entity';
import { Roles } from './roles.entity';
import { Systems } from './systems.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Systems)
  @JoinColumn()
  @IsInt()
  systemType: Systems;

  @Column()
  @IsInt()
  currency: number;

  @OneToOne(() => Languages)
  @JoinColumn()
  language: Languages;

  @OneToOne(() => Roles)
  @JoinColumn()
  role: Roles;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
