import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Clients } from './clients.entity';

@Entity()
export class HowYouFeel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Clients)
  client: Clients;

  @Column({ type: 'int' })
  rate: number;

  @Column({ type: 'date' })
  date: Date;
}
