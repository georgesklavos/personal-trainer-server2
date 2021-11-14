import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Languages } from './languages.entity';
import { Levels } from './levels.entity';

@Entity()
export class LevelsTs {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 200 })
  value: string;

  @Column({
    name: 'referenceId',
  })
  @ManyToOne(() => Levels)
  @JoinColumn()
  reference: Levels;

  @Column({
    name: 'languageId',
  })
  @ManyToOne(() => Languages)
  @JoinColumn()
  language: Languages;
}
