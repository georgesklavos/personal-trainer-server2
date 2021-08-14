import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Clients } from './clients.entity';
import { Programs } from './programs.entity';
import { Users } from './users.entity';

@Entity()
export class Payments {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    name: 'userVerifiedId',
    nullable: true,
  })
  @ManyToOne(() => Users)
  @JoinColumn()
  userVerified: Users;

  @ManyToOne(() => Clients)
  @JoinColumn()
  client: Clients;

  @Column({ type: 'date' })
  dateClientPaid: Date;

  @Column({ type: 'date', nullable: true })
  dateVerified: Date;

  @Column({ type: 'float' })
  ammount: number;

  @ManyToOne(() => Programs)
  @JoinColumn()
  program: Programs;

  @Column({ type: 'boolean' })
  verified: boolean;

  @Column({ type: 'int' })
  currency: number;
}
