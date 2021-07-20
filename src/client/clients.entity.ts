import { Users } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Clients {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Users)
  @JoinColumn()
  user: Users;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  //Vale to relation me ton owner edw afou kaneis to owner entity

  @Column()
  age: number;

  @Column()
  gender: number;
  //ftiaxe to helper tables pou tha valeis ekei diafora columns gia sex, currenct klp
}
