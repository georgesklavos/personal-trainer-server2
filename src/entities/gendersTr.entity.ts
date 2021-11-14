import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Genders } from './genders.entity';
import { Languages } from './languages.entity';

@Entity()
export class GendersTs {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 200 })
  value: string;

  @IsInt()
  @Column({
    name: 'referenceId',
  })
  @ManyToOne(() => Genders)
  @JoinColumn()
  reference: Genders;

  @Column({
    name: 'languageId',
  })
  @ManyToOne(() => Languages)
  @JoinColumn()
  language: Languages;
}
