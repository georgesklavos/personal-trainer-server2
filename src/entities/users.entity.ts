import { IsEmail, IsInt } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToMany,
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

  @ManyToMany(() => Systems)
  @JoinColumn()
  @IsInt()
  systemType: Systems;

  @Column()
  @IsInt()
  currency: number;

  @ManyToMany(() => Genders)
  @JoinColumn()
  gender: Genders;

  @ManyToMany(() => Languages)
  @JoinColumn()
  language: Languages;

  @ManyToMany(() => Roles)
  @JoinColumn()
  role: Roles;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
