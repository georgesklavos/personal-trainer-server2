import { IsEmail, IsInt } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Genders } from './genders.entity';
import { Languages } from './languages.entity';
import { Roles } from './roles.entity';
import { Systems } from './systems.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Systems)
  @JoinColumn()
  @IsInt()
  systemType: Systems;

  @Column()
  @IsInt()
  currency: number;

  @ManyToOne(() => Genders)
  @JoinColumn()
  gender: Genders;

  @ManyToOne(() => Languages)
  @JoinColumn()
  language: Languages;

  @ManyToOne(() => Roles)
  @JoinColumn()
  role: Roles;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
