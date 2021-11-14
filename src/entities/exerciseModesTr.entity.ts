import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExerciseModes } from './exerciseModes.entity';
import { Languages } from './languages.entity';

@Entity()
export class ExerciseModesTs {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 200 })
  value: string;

  @Column({
    name: 'referenceId',
  })
  @ManyToOne(() => ExerciseModes)
  @JoinColumn()
  reference: ExerciseModes;

  @Column({
    name: 'languageId',
  })
  @ManyToOne(() => Languages)
  @JoinColumn()
  language: Languages;
}
