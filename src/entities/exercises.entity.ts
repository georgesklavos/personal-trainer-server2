import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CoolUpExercises } from './coolUpExercises.entity';
import { Days } from './Days.entity';
import { ExerciseModes } from './exerciseModes.entity';
import { Users } from './users.entity';
import { WarmUpExercises } from './warmUpExercises.entity';
import { WorkoutExercises } from './workoutExercises.entity';

@Entity()
export class Exercises {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users)
  @JoinColumn()
  user: Users;

  @OneToOne(() => Days, { onDelete: 'CASCADE' })
  @JoinColumn()
  day: Days;

  @Column()
  date: Date;

  @ManyToOne(() => ExerciseModes)
  @JoinColumn()
  exerciseMode: ExerciseModes;

  @OneToMany(
    () => WarmUpExercises,
    (warmUpExercises) => warmUpExercises.exercise,
  )
  @JoinColumn()
  warmUpExercises: WarmUpExercises[];

  @OneToMany(
    () => WorkoutExercises,
    (workoutExercises) => workoutExercises.exercise,
  )
  @JoinColumn()
  workoutExercises: WorkoutExercises[];

  @OneToMany(
    () => CoolUpExercises,
    (coolUpExercises) => coolUpExercises.exercise,
  )
  @JoinColumn()
  coolUpExercises: CoolUpExercises[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
