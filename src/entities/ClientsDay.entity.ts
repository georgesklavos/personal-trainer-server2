import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClientsDay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: false })
  exercise: boolean;

  @Column({ type: 'boolean', default: false })
  macros: boolean;

  @Column({ type: 'boolean', default: false })
  steps: boolean;

  @Column({ type: 'boolean', default: false })
  weight: boolean;

  @Column({ type: 'boolean', default: false })
  payment: boolean;

  @Column({ type: 'boolean', default: false })
  comment: boolean;
}
