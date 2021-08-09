import { Exercises } from 'src/entities/exercises.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WorkoutExercises {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Exercises, (exercise) => exercise.workoutExercises)
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
