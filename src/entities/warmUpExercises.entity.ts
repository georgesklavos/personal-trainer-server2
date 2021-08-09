import { Exercises } from 'src/entities/exercises.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WarmUpExercises {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Exercises, (exercise) => exercise.warmUpExercises)
  exercise: Exercises;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  value: number;

  @Column({ type: 'int' })
  option: number;

  @Column({ type: 'boolean', default: false })
  hasVideo: boolean;
}
