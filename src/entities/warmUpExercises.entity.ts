import { Exercise } from 'src/entities/exercise.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WarmUpExercises {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Exercise, (exercise) => exercise.warmUpExercises)
  exercise: Exercise;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  value: number;

  @Column({ type: 'int' })
  option: number;

  @Column({ type: 'boolean', default: false })
  hasVideo: boolean;
}
