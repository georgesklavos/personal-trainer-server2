import { Exercises } from 'src/entities/exercises.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CoolUpExercises {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Exercises, (exercise) => exercise.coolUpExercises)
  exercise: Exercises;

  @Column({ type: 'int' })
  name: number;

  @Column({ type: 'int' })
  value: number;

  @Column({ type: 'int' })
  option: number;

  @Column({ type: 'boolean', default: false })
  hasVideo: boolean;
}
