import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class HowYouFeel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users)
  user: Users;

  @Column({ type: 'int' })
  rate: number;

  @Column({ type: 'date' })
  date: Date;
}
