import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Languages } from './languages.entity';

@Entity()
export class LanguagesTs {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 200 })
  value: string;

  @Column({
    name: 'referenceId',
  })
  @ManyToOne(() => Languages)
  @JoinColumn()
  reference: Languages;

  @Column({
    name: 'languageId',
  })
  @ManyToOne(() => Languages)
  @JoinColumn()
  language: Languages;
}
