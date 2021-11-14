import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Min,
} from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Languages } from './languages.entity';

@Entity()
export class EmailVerifiedTs {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Length(100)
  @Column({ type: 'varchar', length: 100 })
  subject: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Length(100)
  @Column({ type: 'varchar', length: 100 })
  title: string;

  @IsDefined()
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
