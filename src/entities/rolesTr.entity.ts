import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Languages } from './languages.entity';
import { Roles } from './roles.entity';

@Entity()
export class RolesTs {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 200 })
  value: string;

  @Column({
    name: 'referenceId',
  })
  @ManyToOne(() => Roles)
  @JoinColumn()
  reference: Roles;

  @Column({
    name: 'languageId',
  })
  @ManyToOne(() => Languages)
  @JoinColumn()
  language: Languages;
}
