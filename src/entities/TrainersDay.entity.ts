import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TrainersDay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean' })
  exercise: boolean;

  @Column({ type: 'boolean' })
  macros: boolean;

  @Column({ type: 'boolean' })
  steps: boolean;

  @Column({ type: 'boolean' })
  weight: boolean;

  @Column({ type: 'boolean' })
  payment: boolean;

  @Column({ type: 'boolean' })
  comment: boolean;
}
