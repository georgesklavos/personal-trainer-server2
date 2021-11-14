import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Languages } from './languages.entity';
import { Targets } from './targets.entity';

@Entity()
export class TargetsTs {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 200 })
  value: string;

  @Column({
    name: 'referenceId',
  })
  @ManyToOne(() => Targets)
  @JoinColumn()
  reference: Targets;

  @Column({
    name: 'languageId',
  })
  @ManyToOne(() => Languages)
  @JoinColumn()
  language: Languages;
}
