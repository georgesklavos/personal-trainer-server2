import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CoolUpExercises } from './coolUpExercises.entity';
import { ExerciseModes } from './exerciseModes.entity';
import { Users } from './users.entity';
import { WarmUpExercises } from './warmUpExercises.entity';
import { WorkoutExercises } from './workoutExercises.entity';

@Entity()
export class Exercises {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users)
  user: Users;

  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => ExerciseModes)
  exerciseMode: ExerciseModes;

  @OneToMany(
    () => WarmUpExercises,
    (warmUpExercises) => warmUpExercises.exercise,
  )
  warmUpExercises: WarmUpExercises[];

  @OneToMany(
    () => WorkoutExercises,
    (workoutExercises) => workoutExercises.exercise,
  )
  workoutExercises: WorkoutExercises[];

  @OneToMany(
    () => CoolUpExercises,
    (coolUpExercises) => coolUpExercises.exercise,
  )
  coolUpExercises: CoolUpExercises[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
