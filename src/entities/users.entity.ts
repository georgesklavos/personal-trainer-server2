import { IsEmail, IsInt } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
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

  @Column({ unique: true, update: false })
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

  @Column({
    name: 'roleId',
    update: false,
  })
  @ManyToOne(() => Roles)
  @JoinColumn({
    name: 'roleId',
  })
  role: Roles;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
