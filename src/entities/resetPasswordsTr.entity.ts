import { IsNotEmpty, IsString, Length } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Languages } from './languages.entity';

@Entity()
export class ResetPasswordTs {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Length(100)
  @Column({ type: 'varchar', length: 100 })
  subject: string;

  @IsString()
  @IsNotEmpty()
  @Length(100)
  @Column({ type: 'varchar', length: 100 })
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(200)
  @Column({ type: 'varchar', length: 200 })
  description: string;

  @Column({
    name: 'languageId',
  })
  @ManyToOne(() => Languages)
  @JoinColumn()
  language: Languages;
}
